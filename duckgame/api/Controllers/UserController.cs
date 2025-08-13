using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MySqlConnector;
using sqlApi.Models;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace sqlApi.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration cfg;

        public UserController(IConfiguration cfg)
        {
            this.cfg = cfg;
        }

        [HttpPost]
        public async Task<IActionResult> Post(UserDto dto)
        {
            await using var conn = new MySqlConnection(cfg.GetConnectionString("Default"));
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand("CALL add_user(@p_name)", conn);
            cmd.Parameters.AddWithValue("@p_name", dto.Name);
            var rows = await cmd.ExecuteNonQueryAsync();
            return Ok(new { inserted = rows });
        }

        [HttpPost("score")]
        public async Task<IActionResult> PostScore(ScoreDto dto)
        {
            await using var conn = new MySqlConnection(cfg.GetConnectionString("Default"));
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand("CALL upsert_user_score(@p_name, @p_score)", conn);
            cmd.Parameters.AddWithValue("@p_name", dto.Name);
            cmd.Parameters.AddWithValue("@p_score", dto.Score);
            var rows = await cmd.ExecuteNonQueryAsync();
            return Ok(new { affected = rows });
        }

        [HttpGet]
        public async Task<ActionResult<List<UserItem>>> Get()
        {
            var list = new List<UserItem>();
            await using var conn = new MySqlConnection(cfg.GetConnectionString("Default"));
            await conn.OpenAsync();
            await using var cmd = new MySqlCommand("SELECT id, name, high_score FROM users ORDER BY high_score DESC, id", conn);
            await using var reader = await cmd.ExecuteReaderAsync(CommandBehavior.CloseConnection);
            while (await reader.ReadAsync())
            {
                var item = new UserItem
                {
                    Id = reader.GetInt32(0),
                    Name = reader.GetString(1)
                };
                list.Add(item);
            }
            return list;
        }
    }
}
