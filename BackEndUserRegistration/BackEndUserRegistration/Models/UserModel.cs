﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BackEndUserRegistration.Models
{
    public class UserModel
    {
        //[Key]
        //public int Id { get; set; }
        [Required]

        public string FirstName { get; set; }

        public string LastName { get; set; }
        [Required]

        public string Email { get; set; }
        [Required]

        public string Username { get; set; }
        [Required]

        public string Password { get; set; }

        public bool SuperUser { get; set; }

        public string Role { get; set; }
    }
}
