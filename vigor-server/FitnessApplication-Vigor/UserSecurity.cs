using FitnessApplication_Vigor.DTO;
using FitnessApplication_Vigor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading;
using System.Web;

namespace FitnessApplication_Vigor
{
    public class UserSecurity
    {
        public static bool Login(string username, string password)
        {
            using (FitnessContext db = new FitnessContext())
            {
                return db.Users.Any(user => user.UserName.Equals(username,
                    StringComparison.OrdinalIgnoreCase) && user.Password == password);
            }
        }
    }
}