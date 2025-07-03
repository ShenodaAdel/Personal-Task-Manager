using Domain;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<Domain.Task>()
                .Property(t => t.Title)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Domain.Task>()
                .Property(t => t.Description)
                .IsRequired()
                .HasMaxLength(500);

            modelBuilder.Entity<Domain.Task>()
                .Property(t => t.IsCompleted)
                .HasDefaultValue(false);

            modelBuilder.Entity<Domain.Task>()
                .Property(t => t.CreatedAt)
                .HasDefaultValueSql("GETDATE()");

            modelBuilder.Entity<Domain.Task>()
                .Property(t => t.CompletedAt)
                .IsRequired(false); // may be nullable

            modelBuilder.Entity<Domain.Task>()
                .Property(t => t.DueDate)
                .IsRequired(false);

            modelBuilder.Entity<Domain.Task>()
                .HasMany(t => t.TaskFiles)
                .WithOne(tf => tf.Task)
                .HasForeignKey(tf => tf.TaskId)
                .OnDelete(DeleteBehavior.Cascade); // Ensures that files are deleted when the task is deleted

            modelBuilder.Entity<Domain.Task>()
                .Property(t => t.Status)
                .IsRequired()
                .HasConversion<int>()
                .HasDefaultValue(Domain.TaskStatus.Pending); // Default status is Pending

            modelBuilder.Entity<TaskFile>()
                .Property(tf => tf.FileName)
                .IsRequired()
                .HasMaxLength(255);

            modelBuilder.Entity<TaskFile>()
                .Property(tf => tf.FilePath)
                .IsRequired()
                .HasMaxLength(500);


            modelBuilder.Entity<TaskFile>()
                .HasIndex(tf => tf.TaskId)
                .HasName("IX_TaskId");


        }

        public DbSet<Domain.Task> Tasks { get; set; }
        public DbSet<TaskFile> TaskFiles { get; set; }
    }
}
