namespace Domain
{
    public class TaskFile
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public int TaskId { get; set; }
        public Task Task { get; set; } // Navigation property to the Task entity
    }
}
