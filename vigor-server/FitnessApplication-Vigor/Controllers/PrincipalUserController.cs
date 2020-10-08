using FitnessApplication_Vigor.Code;
using FitnessApplication_Vigor.DTO;
using FitnessApplication_Vigor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FitnessApplication_Vigor.Controllers
{
    public class PrincipalUserController : ApiController
    {
        // GET: api/PrincipalUser
        // READ USER
        [BasicAuthentication]
        [EnableCors("*", "*", "*")]
        public HttpResponseMessage Get()
        {
            // check logged user
            PrincipalUser pu = new PrincipalUser();
            try
            {
                pu = pu.GetUser();
            }
            catch (Exception ex)
            {
                string msg = "GetPrincipalUser() failed.";
                System.Diagnostics.Debug.WriteLine(ex);
                return Request.CreateResponse(HttpStatusCode.InternalServerError, msg); // 500
            }
            // authenticated?
            if (!pu.IsAuthenticated)
            {
                string msg = "Authentication of the request failed.";
                System.Diagnostics.Debug.WriteLine(msg);
                return Request.CreateResponse(HttpStatusCode.Unauthorized, msg);  // 401
            }
            // UserId is required
            if (pu.UserId == 0)
            {
                string msg = "The UserId claim is missing or invalid.";
                System.Diagnostics.Debug.WriteLine(msg);
                return Request.CreateResponse(HttpStatusCode.Unauthorized, msg);  // 401
            }

            // retrun list
            List<PrincipalUserDTO> ret_list = null;
            try
            {
                using (FitnessContext db = new FitnessContext())
                {
                    var ret = (from u in db.Users
                               join al in db.ActivityLevels on u.ActivityLevelId equals al.ID
                               where u.UserId == pu.UserId
                               select new PrincipalUserDTO
                               {
                                   UserId = u.UserId,
                                   Username = u.UserName,
                                   Password = u.Password,
                                   Email = u.Email,
                                   Firstname = u.FirstName,
                                   Lastname = u.LastName,
                                   Age = u.Age,
                                   Height = u.Height,
                                   Weight = u.Weight,
                                   ActivityLevelId = u.ActivityLevelId,
                                   ActivityLevelName = al.Name,
                                   ActivityLevelDescription = al.Description
                               });
                    // Got data?
                    if (ret.Count() == 0)
                    {
                        string msg = "DB operation returned no data.";
                        return Request.CreateResponse(HttpStatusCode.NotFound, msg);  // 404
                    }
                    ret_list = ret.ToList();
                }
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "DB operation returned an error"); // 500
            }
            // returning list 
            return Request.CreateResponse(HttpStatusCode.OK, ret_list); // 200
        }
        // POST: api/PrincipalUser
        // CREATE USER
        [EnableCors("*", "*", "*")]
        public HttpResponseMessage Post([FromBody] User user)
        {
            try
            {
                using (FitnessContext db = new FitnessContext())
                {
                    user.Created = DateTime.Now;
                    db.Users.Add(user);
                    db.SaveChanges();
                }
            }
            catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex); // 500
            }
            return Request.CreateResponse(HttpStatusCode.OK); // 200
        }
    }
}
