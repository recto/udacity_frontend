/*
This is empty on purpose! Your code to build the resume will go here.
*/
// $("#main").append("Itsuo Okamoto");
/**
var awesomeThoughts = "My name is Itsuo and I am AWESOME!";
console.log(awesomeThoughts);

var funThoughts = awesomeThoughts.replace("AWESOME", "FUN");
$("#main").append(funThoughts);
*/
var apiKey = "AIzaSyA9sN0-XE2-evetw68AJrur3dexxcD6W2w";
var myname = "Itsuo Okamoto";
var role = "Web Developer";
var mobile = "555-555-5555";
var email = "itsuo@recto.com";
var github = "recto";
var twitter = "@na";
var address = "Sunnyvale, CA";
var pictureUrl = "images/20150412_101008.jpg";
var welcomeMessage = "Welcome to my profile page!!";
/**
Formatted Name/Role
var formattedName = HTMLheaderName.replace("%data%", name);
var formattedRole = HTMLheaderRole.replace("%data%", role);
var formattedContact = HTMLcontactGeneric.replace("%contact%", contact)
$("#header").prepend(formattedRole);
$("#header").prepend(formattedName);
*/

/**
Formatted Name/Role/Contact/Picture URL with bio object.
*/
var bio = {
     "name" : myname,
     "role" : role,
     "welcomeMessage" : welcomeMessage,
     "skills" : ["java", "javascript"],
     "contacts" : {
        "mobile" : mobile,
        "email" : email,
        "github" : github,
        "twitter" : twitter,
        "location" : address,
    },
    "biopic" : pictureUrl
};

bio.display = function () {
    var formattedName = HTMLheaderName.replace("%data%", bio.name);
    var formattedRole = HTMLheaderRole.replace("%data%", bio.role);
    var formattedMobile = HTMLmobile.replace("%data%", bio.contacts.mobile);
    var formattedEmail = HTMLemail.replace("%data%", bio.contacts.email);
    var formattedGithub = HTMLgithub.replace("%data%", bio.contacts.github);
    var formattedLocation = HTMLlocation.replace("%data%", bio.contacts.location);
    var formattedPictureUrl = HTMLbioPic.replace("%data%", bio.biopic);
    var formattedWelcomeMsg = HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage);
    var formattedTwitter;
    if (bio.contacts.twitter) {
        formattedTwitter = HTMLtwitter.replace("%data%", bio.contacts.twitter);
    }
    $("#header").prepend(formattedRole);
    $("#header").prepend(formattedName);
    $("#topContacts").append(formattedMobile, formattedEmail, formattedGithub);
    if (formattedTwitter) {
        $("#topContacts").append(formattedTwitter);
    }
    $("#topContacts").append(formattedLocation);
    $("#header").append(formattedPictureUrl);
    $("#header").append(formattedWelcomeMsg);
    if (bio.skills && bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);
        for (var skill in bio.skills) {
            var formattedSkill = HTMLskills.replace("%data%", bio.skills[skill]);
            $("#header").append(formattedSkill);
        }
    }
    $("#footerContacts").append(formattedMobile, formattedEmail, formattedGithub);
    if (formattedTwitter) {
        $("#footerContacts").append(formattedTwitter);
    }
    $("#footerContacts").append(formattedLocation);
};

var education = {
    "schools" : [{
            "name" : "Kobe University",
            "location" : "Kobe, Hyogo, Japan",
            "degree" : "Bachelor",
            "majors" : ["Electric Engineering", "Business"],
            "dates" : "April 1987 - March 1991",
            "url" : "http://kobe-u.ac.jp"
        }
    ],
    "onlineCourses" : [{
            "title" : "Front-end Web Developer Nanodegeee",
            "school" : "Udacity",
            "date" : "March, 2016",
            "url" : "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001"
        }
    ]
};

education.display = function() {
    $("#education").append(HTMLschoolStart);
    var formatted;
    for (var school in education.schools) {
        var formattedName = HTMLschoolName.replace("%data%",
            education.schools[school].name);
        var formattedDegree = HTMLschoolDegree.replace("%data%",
            education.schools[school].degree);
        $(".education-entry:last").append(formattedName + formattedDegree);
        formatted = HTMLschoolDates.replace("%data%",
            education.schools[school].dates);
        $(".education-entry:last").append(formatted);
        formatted = HTMLschoolLocation.replace("%data%",
            education.schools[school].location);
        $(".education-entry:last").append(formatted);
        if (education.schools[school].majors) {
            formatted = HTMLschoolMajor.replace("%data%",
                education.schools[school].majors.join(", "));
            $(".education-entry:last").append(formatted);
        }
        formatted = HTMLonlineURL.replace("%data%",
            education.schools[school].url);
        $(".education-entry:last").append(formatted);
    }
    for (var course in education.onlineCourses) {
        $("#education").append(HTMLonlineClasses);
        $("#education").append(HTMLonlineStart);
        var formattedTitle = HTMLonlineTitle.replace("%data%",
            education.onlineCourses[course].title);
        var formattedSchool = HTMLonlineSchool.replace("%data%",
            education.onlineCourses[course].school);
        $(".online-entry:last").append(formattedTitle + formattedSchool);
        formatted = HTMLonlineDates.replace("%data%",
            education.onlineCourses[course].date);
        $(".online-entry:last").append(formatted);
        formatted = HTMLonlineURL.replace("%data%",
            education.onlineCourses[course].url);
        $(".online-entry:last").append(formatted);
    }

};

var work = {
    "jobs" : [{
            "employer" : "Software AG",
            "title" : "Globalization Architect",
            "location" : "Santa Clara, CA",
            "dates" : "May 2005 - Feburary 2016",
            "description" : "Internationalize and localize software."
        },
        {
            "employer" : "Oracle Corporation",
            "title" : "Senior Manager, Internationalization Group",
            "location" : "Redwood City, CA",
            "dates" : "April 1997 - April 2005",
            "description" : "Internationalize and localize software."
        }
    ]
};

work.display = function() {
    for (var job in work.jobs) {
        $("#workExperience").append(HTMLworkStart);
        var formattedEmployer = HTMLworkEmployer.replace("%data%",
            work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%",
            work.jobs[job].title);
        $(".work-entry:last").append(formattedEmployer + formattedTitle);
        var formatted = HTMLworkLocation.replace("%data%",
            work.jobs[job].location);
        $(".work-entry:last").append(formatted);
        formatted = HTMLworkDates.replace("%data%",
            work.jobs[job].dates);
        $(".work-entry:last").append(formatted);
        formatted = HTMLworkDescription.replace("%data%",
            work.jobs[job].description);
        $(".work-entry:last").append(formatted);
    }
};

var projects = {
    "projects" : [
        {
            "title" : "About Me",
            "dates" : "March 2016",
            "description" : "Produce \"About Me\" page",
            "images" : ["images/udacity_logo.svg"]
        }
    ]
};

projects.display = function() {
    for (var project in projects.projects) {
        $("#projects").append(HTMLprojectStart);
        var formattedTitle = HTMLprojectTitle.replace("%data%",
            projects.projects[project].title);
        var formattedDates = HTMLprojectDates.replace("%data%",
            projects.projects[project].dates);
        var formattedDescription = HTMLprojectDescription.replace("%data%",
            projects.projects[project].description);
        $(".project-entry:last").append(formattedTitle);
        $(".project-entry:last").append(formattedDates);
        $(".project-entry:last").append(formattedDescription);

        if(projects.projects[project].images.length > 0) {
            for (var image in projects.projects[project].images) {
                var formattedImage = HTMLprojectImage.replace("%data%",
                    projects.projects[project].images[image]);
                $(".project-entry:last").append(formattedImage);
            }
        }
    }
};

function locationizer(work_obj) {
    var locations = [];
    for (var job in work_obj.jobs) {
        locations.push(work_obj.jobs[job].location);
    }
    return locations;
}

bio.display();
projects.display();
work.display();
education.display();
$("#mapDiv").append(googleMap);
