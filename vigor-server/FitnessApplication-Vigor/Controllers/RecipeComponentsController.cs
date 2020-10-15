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
    public class RecipeComponentsController : ApiController
    {
        // GET api/GetRecipeComponents
        // Get all user's recipes
        [BasicAuthentication]
        [EnableCors("*", "*", "*")]
        [Route("api/GetRecipeComponents")]
        public HttpResponseMessage Get(int recipeid)
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
            
            // return list
            List<RecipeComponentDTO> ret_list = null;

            try
            {
                using (FitnessContext db = new FitnessContext())
                {
                    var ret = (
                        from c in db.RecipeComponents
                        where c.RecipeId == recipeid
                        select new RecipeComponentDTO
                        {
                             RecipeId = c.RecipeId,
                             Component = c.Component,
                             Measurement = c.Measurement,
                             Quantity = c.Quantity,
                             Calories = c.Calories
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
        // add recipe component
        [BasicAuthentication]
        [EnableCors("*", "*", "*")]
        [Route("api/CreateRecipeComponent")]
        public HttpResponseMessage Post([FromBody] RecipeComponent component)
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

            try
            {
                using (FitnessContext db = new FitnessContext())
                {
                    component.Created = DateTime.Now;
                    db.RecipeComponents.Add(component);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex); // 500
            }
            return Request.CreateResponse(HttpStatusCode.OK); // 200
        }
    }
}
