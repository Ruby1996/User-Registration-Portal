using BackEndUserRegistration.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BackEndUserRegistration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;

        private readonly UserDbContext _db;
        public UsersController(UserManager<User> userManager, SignInManager<User> signInManager, UserDbContext db)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _db = db;

        }

        // GET: api/<UsersController>
        [HttpGet]
        public List<User> Get()
        {
            return _db.usr.OrderBy(u=>u.FirstName).ThenBy(u=>u.LastName).ToList().FindAll(u=>u.SuperUser == false);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<Object> PostUser(UserModel model)
        {
            model.Role = "User";
            var User = new User()
            {

                FirstName = model.FirstName,
                LastName = model.LastName,
                UserName = model.Username,
                Email = model.Email,
                SuperUser = model.SuperUser,
              

            };
            try
            {
                var result = await _userManager.CreateAsync(User, model.Password);
                await _userManager.AddToRoleAsync(User, model.Role);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        // PUT api/<UsersController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

      

        // PUT api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _db.Entry(user).State = EntityState.Modified;
            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        // DELETE api/<UsersController>/5

        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> Delete(string id)
        {
            var user = await _db.usr.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            _db.usr.Remove(user);
            await _db.SaveChangesAsync();

            return user;
        }

        private bool UserExists(string id)
        {
            return _db.usr.Any(e => e.Id == id);
        }



        //POST api/Users/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginModel model)
        {

            var user = await _userManager.FindByNameAsync(model.Username);

            
            if (user != null && await _userManager.CheckPasswordAsync(user,model.Password))
            {
                //get role
                var role = await _userManager.GetRolesAsync(user);
                IdentityOptions _options = new IdentityOptions();

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                   

                    Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("UserId",user.Id.ToString()),
                    new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1234567890123456")), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Invalid Username or Pasword " });
            }

        }

       

    }
}
