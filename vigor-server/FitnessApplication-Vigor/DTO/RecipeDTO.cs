using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FitnessApplication_Vigor.DTO
{
    public class RecipeComponentDTO
    {
        public int RecipeId { get; set; }
        public string Component { get; set; }
        public string Measurement { get; set; }
        public int Quantity { get; set; }
        public string Calories { get; set; }
    }

    public class RecipeDTO
    {
        public int RecipeId { get; set; }
        public string Name { get; set; }
    }
}