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
    public class ActivityLevelController : ApiController
    {
        // GET api/ActivityLevel
        [BasicAuthentication]
        [EnableCors("*", "*", "*")]
        public HttpResponseMessage Get()
        {
            List<ActivityLevelDTO> ret_list = null;
            try
            {
                using (FitnessContext db = new FitnessContext())
                {
                    var ret = (
                        from al in db.ActivityLevels
                        select new ActivityLevelDTO
                        {
                            ActivityLevelId = al.ActivityLevelId,
                            Name = al.Name,
                            Description = al.Description,
                        });

                    if (ret.Count() == 0)
                    {
                        // no data
                        return Request.CreateResponse(HttpStatusCode.NotFound, "DB operation returned no data."); // 404
                    }
                    ret_list = ret.ToList();
                }
            }
            catch
            {
                // error in code
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "DB operation returned an error"); // 500
            }
            // returning list 
            return Request.CreateResponse(HttpStatusCode.OK, ret_list); // 200
        }
    }
}
