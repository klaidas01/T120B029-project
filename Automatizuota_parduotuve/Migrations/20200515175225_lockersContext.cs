using Microsoft.EntityFrameworkCore.Migrations;

namespace Automatizuota_parduotuve.Migrations
{
    public partial class lockersContext : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Locker_LockerId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Locker",
                table: "Locker");

            migrationBuilder.RenameTable(
                name: "Locker",
                newName: "Lockers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Lockers",
                table: "Lockers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Lockers_LockerId",
                table: "Orders",
                column: "LockerId",
                principalTable: "Lockers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Lockers_LockerId",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Lockers",
                table: "Lockers");

            migrationBuilder.RenameTable(
                name: "Lockers",
                newName: "Locker");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Locker",
                table: "Locker",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Locker_LockerId",
                table: "Orders",
                column: "LockerId",
                principalTable: "Locker",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
