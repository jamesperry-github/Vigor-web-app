using FitnessApplication_Vigor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading;
using System.Web;

namespace FitnessApplication_Vigor.Code
{
    public class PrincipalUser
    {
        public int UserId { get; set; }
        public bool IsAuthenticated { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public int Age { get; set; }
        public string Height { get; set; }
        public string Weight { get; set; }
        public int ActivityLevelId { get; set; }

        public PrincipalUser GetUser()
        {
            IPrincipal id = Thread.CurrentPrincipal;
            PrincipalUser pu = new PrincipalUser();
            using (FitnessContext db = new FitnessContext())
            {
                var filteredUsers = db.Users.Where(u => u.UserName == id.Identity.Name);

                foreach (var user in filteredUsers)
                {
                    var ret = (from u in db.Users
                               where user.UserId == u.UserId
                               select new
                               {
                                   UserId = u.UserId,
                                   IsAuthenticated = id.Identity.IsAuthenticated,
                                   Username = u.UserName,
                                   Password = u.Password,
                                   Email = u.Email,
                                   Firstname = u.FirstName,
                                   Lastname = u.LastName,
                                   Age = u.Age,
                                   Height = u.Height,
                                   Weight = u.Weight,
                                   ActivityLevelId = u.ActivityLevelId
                               });
                   
                    var info = ret.FirstOrDefault();
                    pu.UserId = info.UserId;
                    pu.IsAuthenticated = info.IsAuthenticated;
                    pu.Username = info.Username;
                    pu.Password = info.Password;
                    pu.Email = info.Email;
                    pu.Firstname = info.Firstname;
                    pu.Lastname = info.Lastname;
                    pu.Age = info.Age;
                    pu.Height = info.Height;
                    pu.Weight = info.Weight;
                    pu.ActivityLevelId = info.ActivityLevelId;
                }
            }
            return pu;
        }
    }
}