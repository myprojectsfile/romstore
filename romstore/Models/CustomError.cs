using System;
using System.Collections.Generic;

namespace romstore.Models
{
    public partial class CustomError
    {
        public int ErrorId { get; set; }
        public string ErrorMsg { get; set; }
        public int? UserId { get; set; }
        public int? RoleId { get; set; }
        public DateTime CreationDate { get; set; }
        public string Ipaddress { get; set; }
        public string Url { get; set; }
        public string StackTrace { get; set; }
        public string Sessions { get; set; }
        public string Cookies { get; set; }
        public string FormParams { get; set; }
        public string QueryString { get; set; }
    }
}
