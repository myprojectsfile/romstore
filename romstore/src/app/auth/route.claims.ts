export default {
    "Routes": [
        {
            "routeUrl": "/home",
            "signInRequired": "false",
            "claims": []
        },
        {
            "routeUrl": "/profile",
            "signInRequired": "true",
            "claims": ["SuperUser"]
        },
        {
            "routeUrl": "/profile/profilePhoto",
            "signInRequired": "true",
            "claims": ["SuperAdmin"]
        },
        {
            "routeUrl": "/receiptContainer",
            "signInRequired": "true",
            "claims": ["TransportCorp"]
        }
    ]
}