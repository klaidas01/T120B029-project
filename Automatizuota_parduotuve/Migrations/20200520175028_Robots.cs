using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Automatizuota_parduotuve.Migrations
{
    public partial class Robots : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Robots",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DataOfCreation = table.Column<DateTime>(nullable: false),
                    State = table.Column<int>(nullable: false),
                    Model = table.Column<string>(nullable: true),
                    NumberOfCarts = table.Column<int>(nullable: false),
                    SizeOfCart = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Robots", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Robots");
        }
    }
}
