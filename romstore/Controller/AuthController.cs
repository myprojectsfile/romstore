using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using romstore.Models;
using romstore.Filters;
using System.Security.Claims;
using Microsoft.Extensions.Logging;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;

namespace romstore
{
  [Route("api/[controller]")]
  public class AuthController : Controller
  {
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly IPasswordHasher<IdentityUser> _passHasher;
    private readonly ILogger<AuthController> _logger;
    private readonly IConfigurationRoot _config;

    public AuthController(
      SignInManager<IdentityUser> signInManager,
      UserManager<IdentityUser> userManager,
      IPasswordHasher<IdentityUser> passHasher,
      ILogger<AuthController> logger,
      IConfigurationRoot config
      )
    {
      _signInManager = signInManager;
      _userManager = userManager;
      _passHasher = passHasher;
      _logger = logger;
      _config = config;
    }




    [HttpPost("login")]
    [ValidateModel]
    public async Task<IActionResult> Login([FromBody] CredentialModel model)
    {
      try
      {
        var result = await _signInManager.PasswordSignInAsync(model.UserName, model.Password, false, false);
        if (result.Succeeded)
        {
          return Ok();
        }
      }
      catch (Exception ex)
      {
        _logger.LogError($"exeption thrown while login : {0}", ex);
      }

      return BadRequest("Failed To Login.");
    }

    [HttpPost("register")]
    [ValidateModel]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] CredentialModel model)
    {
      var newUser=new IdentityUser()
      {
        UserName = model.UserName,
      };

      var userResult = await _userManager.CreateAsync(newUser, model.Password);

      if (userResult.Succeeded)
      {
        return Ok(userResult);
      }

      foreach (var userResultError in userResult.Errors)
      {
        ModelState.AddModelError("registering user error",userResultError.Description);
      }

      return BadRequest(userResult.Errors);
    }

    [HttpPost("getToken")]
    [ValidateModel]
    public async Task<IActionResult> GetToken([FromBody] CredentialModel model)
    {
      try
      {
        var user = await _userManager.FindByNameAsync(model.UserName);
        if (user != null)
        {
          if (_passHasher.VerifyHashedPassword(user, user.PasswordHash, model.Password) == PasswordVerificationResult.Success)
          {
            var userClaims = await _userManager.GetClaimsAsync(user);

            var tokenClaims = new[]
            {
              new Claim(JwtRegisteredClaimNames.Sub,user.UserName),
              new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
            }.Union(userClaims);
              
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["tokens:key"]));
            var tokenCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["tokens:issuer"],
                audience: _config["tokens:audience"],
                claims: tokenClaims,
                expires: DateTime.UtcNow.AddHours(3),
                signingCredentials: tokenCredentials
              );

            return Ok(new
            {
              token = new JwtSecurityTokenHandler().WriteToken(token),
              expiration = token.ValidTo
            }
              );
          }
        }
        else
        {
          return Unauthorized();
        }
      }
      catch (Exception ex)
      {
        _logger.LogError($"exeption thrown while generating token : {ex}");
        return StatusCode((int)HttpStatusCode.InternalServerError,"internal server error while creating token.");
      }

      return BadRequest("Failed To generate token.");
    }

  }
}
