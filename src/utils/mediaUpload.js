import { createClient } from "@supabase/supabase-js";
const key = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmY3FsZ25wdXRjaWpuZGxqZHRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NTM1MzIsImV4cCI6MjA1MzIyOTUzMn0.kV3wUlOMmprFaGmrx1chLZ5TM19GUmVJXKgz1qtfQ-g`;
const url = "https://ifcqlgnputcijndljdtr.supabase.co";

export default function uploadMediaToSupabase(file) {
  return new Promise((resolve, reject) => {
    if (file == null) {
      reject("File not added");
    }
    let fileName = file.name;
    const extension = fileName.split(".")[fileName.split(".").length - 1];

    const supabase = createClient(url, key);
    const timeStamp = new Date().getTime();
    fileName = timeStamp + file.name + +"." + extension;

    supabase.storage
      .from("images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      })
      .then(() => {
        const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
          .data.publicUrl;
        resolve(publicUrl);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
//0776479026@Kavi
