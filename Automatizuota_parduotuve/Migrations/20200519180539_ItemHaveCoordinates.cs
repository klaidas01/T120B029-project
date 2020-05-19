using Microsoft.EntityFrameworkCore.Migrations;

namespace Automatizuota_parduotuve.Migrations
{
    public partial class ItemHaveCoordinates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CordinateX",
                table: "Items",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "CordinateY",
                table: "Items",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CordinateX",
                table: "Items");

            migrationBuilder.DropColumn(
                name: "CordinateY",
                table: "Items");
        }
    }
}
