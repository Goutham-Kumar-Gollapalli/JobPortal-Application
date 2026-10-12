package com.gmax.job.jobapp.controller;
import com.gmax.job.jobapp.model.JobPost;

import com.gmax.job.jobapp.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping("/views")
public class JobRestController {

    @Autowired
    private JobService service;
    @GetMapping("/jobpost")
    public String post_job(){
        return """
                <html>
                    <body>
                    <h1>Successfully added User</h1>
                    </body>
                <html>
                """;
    }

    @PostMapping("/jobpost/add")
    public JobPost addJobPost(@RequestBody JobPost jobpost){
        return service.addJobPost(jobpost);
    }

    @GetMapping("/jobposts")
    public List<JobPost> getAllJobs(){
        return service.getAllJobs();
    }

    @GetMapping("/jobposts/{id}")
    public JobPost getJob(@PathVariable int id){
        return service.getJob(id);
    }

    @GetMapping("/jobposts/keyword/{keyword}")
    public List<JobPost> search(@PathVariable String keyword){
        return service.search(keyword);
    }

    @PutMapping("/jobpostupdate")
    public JobPost updateJobPost(@RequestBody JobPost jobpost){
        return service.updateJobPost(jobpost);
    }

    @DeleteMapping("/jobpost/{id}")
    public String deleteJob(@PathVariable int id)
    {
        service.deleteJob(id);
        return "deleted";
    }

    @GetMapping("/load")
    public String loadData(){
        service.load();
        return "success";
    }
}
