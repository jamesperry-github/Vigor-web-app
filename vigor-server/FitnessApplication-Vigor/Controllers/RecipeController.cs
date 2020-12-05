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
    public class RecipeController : ApiController
    {
        // GET api/GetRecipes
        // Get all user's recipes
        [BasicAuthentication]
        [EnableCors("*", "*", "*")]
        [Route ("api/GetRecipes")]
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

            List<RecipeDTO> ret_list = null;
            try
            {
                using (FitnessContext db = new FitnessContext())
                {
                    var ret = (
                        from r in db.Recipes
                        where r.UserId == pu.UserId
                        select new RecipeDTO
                        {
                            RecipeId = r.ID,
                            Name = r.Name,
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
        // Create a recipe
        [BasicAuthentication]
        [EnableCors("*", "*", "*")]
        [Route("api/CreateRecipe")]
        public HttpResponseMessage Post([FromBody] Recipe recipe)
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
                    recipe.Created = DateTime.Now;
                    db.Recipes.Add(recipe);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex); // 500
            }
            return Request.CreateResponse(HttpStatusCode.OK); // 200
        }
        // delete a recipe
        [BasicAuthentication]
        [EnableCors("*", "*", "*")]
        [Route("api/RemoveRecipe")]
        public HttpResponseMessage Delete(int recipeid)
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
                    var x = (from r in db.Recipes
                             where recipeid == r.ID && r.UserId == pu.UserId
                             orderby r.ID descending
                             select r
                             ).FirstOrDefault();
                    //System.Diagnostics.Debug.WriteLine(x.Name);
                    db.Recipes.Remove(x);
                    db.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex); // 500
            }
            return Request.CreateResponse(HttpStatusCode.OK); // 200
        }
        // update a recipe
        [BasicAuthentication]
        [EnableCors("*", "*", "*")]
        [Route("api/UpdateRecipe")]  // TODO:: Combine create recipe components w/ update recipe method...
        public HttpResponseMessage Put([FromBody] Recipe recipe, int recipeid)
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
                    var x = (from r in db.Recipes
                             where recipeid == r.ID && r.UserId == pu.UserId
                             orderby r.ID descending
                             select r
                             ).FirstOrDefault();
                    //System.Diagnostics.Debug.WriteLine(x.Name);
                    x.Name = recipe.Name;
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
