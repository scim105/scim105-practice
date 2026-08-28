/* =====================================================================
   SCIM 105 Practice - THE ONLY FILE YOU NORMALLY NEED TO EDIT BY HAND
   Fill in the two values from Supabase (Settings -> API), then save.
   ===================================================================== */
window.SCIM_CONFIG = {

  // 1) Supabase -> Project Settings -> Data API -> Project URL
  SUPABASE_URL: "https://gdrtcdhnbhypcajxpblo.supabase.co",

  // 2) Supabase -> Project Settings -> API Keys -> anon / public key
  //    (This key is safe to publish. Never paste the "service_role" key here.)
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkcnRjZGhuYmh5cGNhanhwYmxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5Mzk5MTgsImV4cCI6MjEwMjUxNTkxOH0.VVQfgeJ6zcbhefpaBKQ2j-AG5iUP6qnv4pZmTxtXliw",

  // 3) Only e-mails ending with these domains are allowed in.
  ALLOWED_DOMAINS: [
    "student.mahidol.ac.th",
    "student.mahidol.edu",
    "mahidol.ac.th",
    "mahidol.edu"
  ],

  // 4) Wording shown in the page header
  COURSE_CODE: "SCIM 105",
  COURSE_NAME: "Fundamentals of Scientific Computing",

  // 5) How many seconds a student's program may run before we stop it
  RUN_TIMEOUT_SECONDS: 6
};
