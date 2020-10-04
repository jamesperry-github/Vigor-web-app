using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FitnessApplication_Vigor.Controllers
{
    public class hggController : ApiController
    {
        // GET: api/hgg
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/hgg/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/hgg
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/hgg/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/hgg/5
        public void Delete(int id)
        {
        }
    }
}
