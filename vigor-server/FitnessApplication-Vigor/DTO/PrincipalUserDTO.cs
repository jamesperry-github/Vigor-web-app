using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitnessApplication_Vigor.DTO
{
    public class PrincipalUserDTO
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public int Age { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public int ActivityLevelId { get; set; }
        public string ActivityLevelName { get; set; }
        public string ActivityLevelDescription { get; set; }
    }
}