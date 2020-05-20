using Automatizuota_parduotuve.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Automatizuota_parduotuve.Context
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options){}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Item>()
                .HasKey(i => i.Id);

            modelBuilder.Entity<Order>()
                .HasKey(o => o.Id);
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Locker)
                .WithMany()
                .HasForeignKey(o => o.LockerId);

            modelBuilder.Entity<ItemSet>()
                .HasKey(its => new { its.ItemId, its.OrderId });
            modelBuilder.Entity<ItemSet>()
                .HasOne(its => its.Item)
                .WithMany()
                .HasForeignKey(its => its.ItemId);
            modelBuilder.Entity<ItemSet>()
                .HasOne(its => its.Order)
                .WithMany(o => o.ItemSets)
                .HasForeignKey(its => its.OrderId);

            modelBuilder.Entity<Locker>()
                .HasKey(l => l.Id);

            modelBuilder.Entity<Robot>()
                .HasKey(p => p.Id);
        }

        public DbSet<Item> Items { get; set; }
        public DbSet<ItemSet> ItemSets { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Locker> Lockers { get; set; }
        public DbSet<Robot> Robots { get; set; }
    }
}
