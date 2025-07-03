namespace Domain
{
    public class Task
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime? CompletedAt { get; set; }
        public DateTime? DueDate { get; set; }

        public TaskStatus Status { get; set; }

        public ICollection<TaskFile> TaskFiles { get; set; } // Navigation property for related files
    }
    public enum TaskStatus
    {
        Pending = 0 , // Task is not started yet
        InProgress = 1 , // Task is currently being worked on
        Completed = 2 , // Task has been completed
        Canceled = 3  // Task is canceled  
    }
}
