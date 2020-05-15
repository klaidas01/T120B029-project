using Microsoft.EntityFrameworkCore.Migrations;

namespace Automatizuota_parduotuve.Migrations
{
    public partial class lockers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "LockerId",
                table: "Orders",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Locker",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Size = table.Column<double>(nullable: false),
                    isFull = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locker", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_LockerId",
                table: "Orders",
                column: "LockerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Locker_LockerId",
                table: "Orders",
                column: "LockerId",
                principalTable: "Locker",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Locker_LockerId",
                table: "Orders");

            migrationBuilder.DropTable(
                name: "Locker");

            migrationBuilder.DropIndex(
                name: "IX_Orders_LockerId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "LockerId",
                table: "Orders");
        }
    }
}
