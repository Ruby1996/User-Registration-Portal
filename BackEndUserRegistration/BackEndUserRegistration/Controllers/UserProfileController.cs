using BackEndUserRegistration.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace BackEndUserRegistration.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<User> _userManager;
        private readonly UserDbContext _db;
        public UserProfileController(UserManager<User> userManager, UserDbContext db)
        {
            _userManager = userManager;
            _db = db;

        }

        //GET: api/UserProfile
        [HttpGet]
        [Authorize]

        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return user;
           
        }

       

        [HttpPost]
        
        [Authorize]
        [Route("ChangePassword")]
        public async Task<Object> ChangePassword(ResetPasswordViewModel model)
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var user = await _userManager.FindByIdAsync(userId);

            

            if(user == null)
            {
                return NotFound();
            }

            else if (await _userManager.CheckPasswordAsync(user, model.OldPassword))
            {

                var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                return new
                {
                    FullName = user.FirstName + " " + user.LastName,
                    user.FirstName,
                    user.LastName,
                    user.Email,
                    user.UserName
                };

            }
            else
            {
                return BadRequest(new { message = "Invalid Username or Pasword " });
            }
            


        }

        [HttpPost]
        [Authorize]
        [Route("UpdateProfile")]
        public async Task<Object> UpdateProfile( ProfileUpdateModel user)
        {

            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            var userData = await _userManager.FindByIdAsync(userId);

            userData.FirstName = user.FirstName;
            userData.LastName = user.LastName;
            userData.Email = user.Email;

            var result = await _userManager.UpdateAsync(userData);

            if (userData == null)
            {
                return NotFound();
            }
            

            return userData;

            //    if (id != user.Id)
            //    {
            //        return BadRequest();
            //    }
            //    _db.Entry(user).State = EntityState.Modified;
            //    try
            //    {
            //        await _db.SaveChangesAsync();
            //    }
            //    catch (DbUpdateConcurrencyException)
            //    {
            //        if (!UserExists(id))
            //        {
            //            return NotFound();
            //        }
            //        else
            //        {
            //            throw;
            //        }
            //    }
            //    return NoContent();


        }

        private bool UserExists(string id)
        {
            return _db.usr.Any(e => e.Id == id);
        }
    }
}
