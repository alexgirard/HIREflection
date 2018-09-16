const express = require('express');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const app = express();
const port = process.env.PORT || 5000;


app.get('/api/hello', (req, res) => {

  var operations;
  sendHttpPostRequest(`https://vision.googleapis.com/v1/files:asyncBatchAnnotate?key=AIzaSyAMC3nD9pSF1n718XyzpIBfEyprC99Ogx8`, (googleResponse) => {
    var JsonGoogleResponse = JSON.parse(googleResponse);
    operations = JsonGoogleResponse["name"];
    operations = operations.slice(11, );

    var downloadLink;
    sendHttpGetDownloadRequest('https://www.googleapis.com/storage/v1/b/hireflection/o/Resumes%2Foutput-1-to-1.json', (downloadInfo) => {
      var downloadInfoJson = JSON.parse(downloadInfo);
      downloadLink = downloadInfoJson.mediaLink;

      /*IBM Watsoon API*/

      var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

      var discovery = new DiscoveryV1({
        version: '2017-11-07',
        username: '0dd90daf-6615-4de7-a52f-d1c35ddc5883',
        password: 'UuP8rTsKFh2y'
      });
      discovery.query({ environment_id: 'f817de97-85dd-4e5a-ab10-f4ab701ebc14', collection_id: '50f83463-32fe-41db-b229-4201c672f5d2', query: 'enriched_text.entities.text:watson' }, (error, data) => {
        /*console.log(JSON.stringify(data, null, 2));*/

        //Key,Value: Word, Frequency
        var dictionaryMap = new Map();
        var pageRatingArray = [
          ["BELLEVUE\nUNIVERSITY\nCareer Services\nRESUME SAMPLES\nPreparing an effective resume is a difficult and time-consuming task. This handout\ncontains resume examples that will help you get started. Different formats and styles\nare used to illustrate the various suggestions and tips contained in the handout,\n\"Preparing Your Resume,\" also available through the Bellevue University Career Services\nCenter.\nRemember, these are intended to serve only as examples. You should modify or change\nas appropriate to customize your resume according to your skills, experience, education,\nand the job you're applying.\nFor additional guidance or assistance, contact the Career Services Center at\n(402) 557-7423, (800) 756-7920 ext. 7423 or careerservices@bellevue.edu.\nA Word of Caution: Please don't be tempted to use one of the\nResume Wizards or Templates that are available online or\nincluded in many word processing programs. They can be difficult\nto work with, don't allow you to present yourself in the best\npossible light and employers can identify them easily. Instead,\ncreate your resume as a simple document in MS Word, like the\nexamples included in this handout.\nRevision: June 2015\n",
            10],
          ["FUNCTIONAL (EXPERIENCED)\nIM A. SAMPLE I\n1234 North 55 Street\nBellevue, Nebraska 68005\n(402) 292-2345\nimasample1@xxx.com\nSUMMARY OF QUALIFICATIONS\nExceptionally well organized and resourceful Professional with more than six years experience and a\nsolid academic background in accounting and financial management; excellent analytical and problem\nsolving skills; able to handle multiple projects while producing high quality work in a fast-paced,\ndeadline-oriented environment.\nEDUCATION\nBachelor of Science, Bellevue University, Bellevue, NE (In Progress)\nMajor: Accounting\nMinor: Computer Information Systems\nExpected Graduation Date: January, 20xx\nGPA to date: 3.95/4.00\nPROFESSIONAL ACCOMPLISHMENTS\nAccounting and Financial Management\nDeveloped and maintained accounting records for up to fifty bank accounts.\n• Formulated monthly and year-end financial statements and generated various payroll records,\nincluding federal and state payroll reports, annual tax reports, W-2 and 1099 forms, etc.\n• Tested accuracy of account balances and prepared supporting documentation for submission during a\ncomprehensive three-year audit of financial operations.\nFormulated intricate pro-forma budgets.\n• Calculated and implemented depreciation/amortization schedules.\nInformation Systems Analysis and Problem Solving\n• Converted manual to computerized accounting systems for two organizations.\n• Analyzed and successfully reprogrammed software to meet customer requirements.\n• Researched and corrected problems to assure effective operation of newly computerized systems.\nWORK HISTORY\nStudent Intern, Financial Accounting Development Program, Mutual of Omaha, Omaha, NE\n(Summer 20xx)\nAccounting Coordinator, Nebraska Special Olympics, Omaha, NE (20xx-20xx)\nBookkeeper, SMC, Inc., Omaha, NE (20xx – 20xx)\nBookkeeper, First United Methodist Church, Altus, OK (20xx – 20xx)\nPROFESSIONAL AFFILIATION\nMember, IMA, Bellevue University Student Chapter\nCOMPUTER SKILLS\nProficient in MS Office (Word, Excel, PowerPoint, Outlook), QuickBooks\nBasic Knowledge of MS Access, SQL, Visual Basic, C++\n•\n",
            9],
          ["CHRONOLOGICAL (HUMAN/SOCIAL SERVICE)\nIM A. SAMPLE X\n3083 North South Street, Apt. A-1\nGrand Island, Nebraska 68803\n(308) 308-3083\nimasample10@xxxx.net\nOBJECTIVE\nSeeking Position in Human/Social Service Administration or related field utilizing strong academic\nbackground, experience and excellent interpersonal skills\nEDUCATION\nBS in Human & Social Service Administration, Bellevue University, Bellevue, NE (Jan 20xx)\n• Dean's Scholar\nGPA: 3.81/4.00\nAAS in Human Services (Dec 19xx), 75-Hr Basic Nursing Assistant Program (Jan 20xx)\nCentral Community College—Hastings Campus, Hastings, NE\nWORK HISTORY\nDay Rehabilitation Specialist, Greater NE Goodwill Industries, Grand Island, NE (June 20xx - Present)\n• Manage a caseload of twenty consumers, assist them in setting and reaching individual plans\n• Facilitate group sessions on Mental Illness, Stress Management and Healthy Relationships\n• Plan and implement social activities for consumers\n• Coordinate and conduct team meetings\nProcess billings, manage petty cash fund, and oversee operations in supervisor's absence\nAssistant Receptionist, Tiffany Square Care Center, Grand Island, NE (Jan - June 20xx)\n• Arranged and facilitated weekend activities for residents\nContacted families to set up dates and times to review and discuss care plans\n• Delivered and read mail to residents, providing companionship and social interaction\nFiled confidential paperwork and provided receptionist/administrative support for the Center\nEmployment Trainer, Central NE Goodwill Industries, Grand Island, NE (Aug 19xx – May 20xx)\n• Managed a caseload of twenty consumers and provided on-the-job coaching to help them succeed\nConducted group job search training sessions and assisted consumers with completion of job\napplications, cover letters and resumes\nCriminal Justice/Shelter Advocate, Crisis Center Inc & Family Violence Coalition, Grand Island, NE\n(July 20xx – Oct 20xx)\n• Responded to crisis calls and provided support to victims of domestic abuse\n• Completed paperwork to document circumstances surrounding alleged abuse for judicial review\nSocial Services Assistant, Tiffany Square Care Center, Grand Island, NE (Jan 20xx – Sept 20xx)\nConducted tours, provided orientation and general assistance for new residents\nCompleted social histories, inventoried clothing, and met one-on-one with residents to help them\nunderstand their rights and responsibilities\nAssisted the Center in meeting critical staffing needs during peak times by working as a certified\nnursing assistant, dietary aide, receptionist and van driver\nCOMMUNITY SERVICE\nVolunteer, Women's Health Services, Grand Island, NE (Fall 20xx - present)\n• Assisted professional staff and participated in one-on-one discussions with women seeking advice\non health-related issues\n. Observed group training sessions to develop the skills needed to facilitate groups in the future\n",
            8],
          ["FUNCTIONAL\nIM A. SAMPLE IX\n987 Northridge Drive\nOmaha, Nebraska 68123\n(402) 543-1234\nimasample9@xxx.com\nOBJECTIVE: Position in Human Resources Administration utilizing strong human relations,\ncustomer service and problem solving skills.\nPROFESSIONAL SKILLS AND ACCOMPLISHMENTS\nAnalysis and Problem Solving\nResearched and developed a survey instrument, subsequently used to obtain\nemployee information on their satisfaction with the company's employee relations\nprogram.\nCompiled and analyzed statistical data to identify potential sources for use in\ndeveloping annual recruiting program.\nCompleted independent research project on the impact of “family friendly” human\nresources policies on employee retention.\nConducted quality control inspections, analyzed results and developed action plans to\naddress areas of concern.\nCommunications and Customer Relations\n• Provided orientation and training to new employees and advised them on the effective\nhandling of customer complaints.\n• Greeted applicants, scheduled interviews, conducted reference checks and\nparticipated in on-campus recruiting activities and career fairs.\nReceived Customer Service Satisfaction Award for high quality of services provided\nto both vendors and customers.\n• Handled customer inquiries and sales; effectively represented company to vendors\nand prospective customers, resulting in a 15% increase in just six months.\nEDUCATION\nBachelor of Science, Bellevue University, Bellevue, NE (In Progress)\n• Major: Psychology\nMinor: Communication Arts\n• Expected Graduation: August 20xx\n• GPA to date: 3.98/4.00\nDean's Scholar\nAssociate of Arts, Iowa Western Community College, Council Bluffs, IA (20xx)\n• Area of Emphasis: Business Administration\nWORK EXPERIENCE\nSenior Sales Associate, Precision Tool, Omaha, NE (20xx to present)\nHuman Resources Intern, Oriental Trading, Omaha, NE (Spring Semester 20xx)\nREFERENCES FURNISHED UPON REQUEST\n",
            7],
          ["CHRONOLOGICAL (GRADUATE ASSISTANTSHIP)\nIM A. SAMPLE VII\n4321 Country Club Road\nOmaha, Nebraska 68123\n(402) 555-9876\nimasample7@xxx.com\nOBJECTIVE\nTo obtain a Graduate Assistantship where strong academic background and excellent\ncommunication skills can be utilized to help college students achieve their educational goals.\nEDUCATION\nGPA: 4.00/4.00\nNational Dean's List\nBachelor of Arts, Bellevue University, Bellevue NE (20xx)\nMajors: Psychology, Sociology\nGraduated Summa Cum Laude Dean's Scholar\nRelevant Coursework\nFundamentals of Guidance & Counseling\nPsychological Assessment\nResearch Methods & Psychological Research\nPersonality Theory\nLearning Theory\nSocial Psychology\nPROFESSIONAL EXPERIENCE\nWriting Tutor and Test Administrator, Bellevue University, Bellevue, NE (20xx – 20xx)\n• Assisted in the preparation and administration of various assessment instruments, including\nCLEP, DANTES and placement tests.\n• Provided tutorial assistance to undergraduate and graduate students in the area of\nwriting/composition.\n• Advised and assisted international students with writing assignments to help them strengthen\ntheir English language skills.\nResearch Assistant, University of Nebraska Medical Center, Omaha, NE (Summer 20xx, 20xx)\n• Assisted child psychologist in a two-part Summer Research Enrichment Program, including\nobservations of client behavior, data entry and preparation of research reports.\n• Performed literature searches and prepared summary reports for a major research project\ninvolving the study of individuals with disabilities.\nCOLLEGIATE HONORS AND ACTIVITIES\nListed in Who's Who Among Students in American Colleges and Universities\nMember, Pi Gamma Mu and Alpha Chi Honor Societies\nPresident, Behavioral and Social Sciences Student Organization, Bellevue University\nVolunteer Contributor, The VUE, Bellevue University Student Newspaper\nMember, Bellevue University Student Advisory Council\nLETTERS OF REFERENCE & TRANSCRIPT ENCLOSED\n",
            6],
          ["FUNCTIONAL (MILITARY)\nIM A. SAMPLE V\n987 Northridge Drive\nOmaha, Nebraska 68123\n(402) 543-1234\nimasample5@xxx.com\nPROFESSIONAL PROFILE\nSelf-motivated, resourceful and dynamic leader with extensive experience and a strong\neducational background in management, training and employee development; exceptional\ncommunication skills and a demonstrated ability to create and manage cohesive, productive work\nteams; proficient in the use of Microsoft Word, Excel and other software applications.\nPROFESSIONAL SKILLS AND ACCOMPLISHMENTS\nManagement and Administration\n• Directed, guided and motivated a workforce of up to 300 individuals with diverse technical\nbackgrounds and experiences.\n• Successfully improved work performance of a “marginal” work team, as evidenced by an\nincrease to a “satisfactory” performance rating after only six months as team leader.\n• Provided day-to-day supervision for an administrative staff of up to sixty employees.\nPlanned, designed and coordinated the programming of computer-based products; designed\nand coordinated computer system testing in facilities throughout the world.\n• Planned, developed and administered annual budgets ranging from $150,000 to $300,000.\nTraining and Development\n• Taught college level courses in leadership, management, team building, effective writing and\nspeech communications.\nCertified as Master Instructor; designed and developed curriculum; selected, trained and\nevaluated other instructors.\n• Advised and educated personnel on ways to enhance and strengthen their promotability and\njob performance; identified and documented career development plans for employees.\n• Provided on-the-job training and guidance for new employees.\nCommunication and Counseling\n• Conducted formal investigations and utilized a variety of counseling techniques and\nstrategies to successfully resolve highly complex and sensitive issues involving domestic\nabuse, racial discrimination, minor law infractions and academic failures.\nWorked one-on-one with customers and employees to enhance self esteem and resolve\ncommunication problems.\n• Marketed and promoted company programs to employees and the general public through a\nvariety of activities including presentations to audiences of over 1000 people.\nEstablished and maintained effective working relationships with co-workers, superiors and\nsubordinates to facilitate the achievement of business objectives.\n",
            5],
          ["CHRONOLOGICAL\nIM A. SAMPLE III\n3456 Westview Road\nBellevue, Nebraska 68005\n(402) 291-5678\nimasample3@xxx.com\nSUMMARY OF QUALIFICATIONS\nExperienced business professional with a solid academic background and a demonstrated\ncommitment to providing high quality customer service; described as a \"take charge\" person with\nexceptional communication and human relations skills; proficient in the use of MS Office (Word,\nExcel, PowerPoint) with basic knowledge of PeopleSoft.\nEDUCATION\nBellevue University, Bellevue, NE (June 20xx)\nBachelor of Science in Management of Human Resources\n• GPA in major: 3.84/4.00\nGraduated with distinction\nPROFESSIONAL EXPERIENCE\nWest Telemarketing, Omaha, NE (20xx to Present)\nCustomer Service Supervisor (20xx to present)\nSupervise operations and staff in a 20-person inbound telemarketing unit, including\nhiring, training and evaluating employees, preparing and administering annual\nbudgets, developing business plans, etc.\nAssess level of customer satisfaction and resolve sensitive and complex issues raised\nby customers; provide additional training and take other action as required to\nmaintain a high level of customer satisfaction.\nCustomer Service Representative (20xx-20xx)\nHandled incoming calls from customers and potential customers, provided\ninformation and received orders using CRT to input data.\nInterviewed customers and recommended other available products to meet their\nneeds; received several Incentive Awards for sales efforts.\nProvided orientation and training to new staff members.\nPROFESSIONAL AFFILIATIONS AND ACTIVITIES\nMember, Society for Human Resources Management (SHRM) (20xx to 20xx)\nBellevue University Student Chapter\n• Chair, Program Development Committee (20xx)\nPresident, American Business Women's Association, Gold Star Chapter (20xx)\nREFERENCES FURNISHED UPON REQUEST\n",
            4],
          ["CHRONOLOGICAL (INTERNSHIP)\nIM A. SAMPLE II\n4321 South 55 Street\nBellevue, Nebraska 68005\n(402) 291-5432\nimasample2@xxx.com\nOBJECTIVE: Internship or Part-time Position in Marketing, Public Relations or related\nfield utilizing strong academic background and excellent communication skills\nEDUCATION:\nBS in Business Administration with Marketing Emphasis\nBellevue University, Bellevue, NE\n• Expected Graduation Date: June, 20xx\n• GPA to date: 3.56/4.00\nRelevant Coursework\nPrinciples of Marketing\nBusiness Communication\nInternet Marketing\nConsumer Behavior\nPublic Relations\nBusiness Policy & Stretegy\nWORK\nHISTORY:\nAacademic Tutor (20xx to present)\nBellevue University, Bellevue, NE\n• Assist college students in overcoming deficiencies and\nsuccessfully mastering academic coursework.\nSenior Accounts Receivable Clerk (20xx-20xx)\nLincoln Financial Group, Omaha, NE\n• Researched story ideas, wrote articles and participated in the\npublication of a weekly in-house newsletter.\nAssisted customers and staff members in resolving problems and\nbalancing accounts; trained new staff members.\n• Managed and recorded daily accounts receivable deposits of up to\n$450,000.\n• Conducted extensive research to recover lost checks and organized\nsystem to stop payment and replace all checks.\nCOMMUNITY\nSERVICE:\nAdvertising Coordinator, The Vue (20xx to present)\nBellevue University Student Newspaper\nVolunteer, Publicity Committee (20xx, 20xx)\nBrushup Nebraska Paint-A-Thon\nADDED VALUE:\nLanguage Skills: Bilingual (English/Spanish)\nComputer Skills: MS Office (Word, Excel, PowerPoint), PhotoShop\nREFERENCES:\nAvailable Upon Request\n",
            3],
          ["CHRONOLOGICAL (MANAGERIAL)\nIM A. SAMPLE VI\n2345 Frederick Street\nOmaha, Nebraska 68123\n(402) 489-3421\nimasample6@xxx.com\nPROFESSIONAL HIGHLIGHTS\n\u003e Extensive technical and management experience in information systems technology with a\nsolid academic background in computer information systems and business administration.\n→ Excellent communicator with strong leadership skills and the ability to build cohesive,\nproductive teams while fostering and encouraging creativity and individual expression.\n→ Areas of expertise:\nOperations Management\nProject Management Quality Management\nMainframe & PC Operations Software Development Systems Design\nCustomer Relations\nTechnical Support\nTroubleshooting\nWORK EXPERIENCE\nSupervisor, Financial Systems, Omaha Public Power District, Omaha NE (20xx to present)\nOversee the maintenance and enhancement of financial systems to ensure process integrity and\nsystem stability for user areas.\nSignificant Accomplishments\n• Managed the implementation of a major software upgrade, significantly increasing efficiency\nin the use of accounts payable and purchasing systems.\nConverted contract and payee information from a third party system to an internal automated\nsystem, resulting in approximately $72,000 in annual revenue for the organization.\nDeveloped a cohesive, productive work team of individuals from diverse areas of the\norganization, utilizing strong interpersonal and leadership skills to foster and encourage\nteamwork and cooperation among team members and with user areas.\nUtilized TQM principles to implement several internal process improvements that have\nresulted in hundreds of time-saving hours annually.\n• Promoted into management position after only six months as a Systems Analyst.\nProgrammer/Analyst, Bishop Clarkson Hospital, Omaha NE (20xx – 20xx)\nProvided systems support and enhancements to user areas throughout the hospital.\nSignificant Accomplishments\n• Developed and implemented an automated system for processing employee timesheets, thus\neliminating the need for handwritten timesheets.\n• Researched, designed and developed a new software application now being used by\nmanagers throughout the organization for strategic planning and reporting.\nRecognized as Information Systems Employee of the Year for the high quality of customer\nservice provided and the successful resolution of numerous systems problems.\nPage One of Two\n",
            2]
        ];
        /*
                var resumes = []
                pageRatingArray.forEach((element) => {
                  for (var i = 0; i < element.length; i++) {
                    resumes[i]={
        
                    }
                  }
                });
                */

        parser(pageRatingArray, dictionaryMap);
        /*
        console.log(dictionary.size);
        dictionary.forEach((value, key, map)=>{
          console.log(`${key}:${value}`);
        });
*/
        var dictionary = []
        var counter = 0;
        dictionaryMap.forEach((value, key, map) => {
          function word(key, value) {
            this.Group = key
            var number = "" + counter;
            var numberColour = counter + "Color"
            this[number]=counter;
            this[numberColour]="hsl(226, 70%, 50%)";
          }
          counter++;
          dictionary.push(new word());
        });
        console.log(dictionary);
        res.send({
          link: downloadLink,
          express: 'Hello From Express',
          dictionary: dictionary,
          operations: operations,
          watsonData: data
        });
      });




    });
  }
  );

  sendHttpGetRequest('https://vision.googleapis.com/v1/operations/dc9c023628e0f8b7?key=', operations);









});

function sendHttpPostRequest(url, callback) {
  var pdfConvReq = new XMLHttpRequest();

  pdfConvReq.onreadystatechange = function () {
    if (pdfConvReq.readyState == 4 && pdfConvReq.status == 200)
      callback(pdfConvReq.responseText);
  }

  pdfConvReq.open("POST", url, true); // true for asynchronous 
  //pdfConvReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  pdfConvReq.send(JSON.stringify(
    {
      "requests": [
        {
          "inputConfig": {
            "gcsSource": {
              "uri": "gs://hireflection/test.pdf"
            },
            "mimeType": "application/pdf"
          },
          "features": [
            {
              "type": "DOCUMENT_TEXT_DETECTION"
            }
          ],
          "outputConfig": {
            "gcsDestination": {
              "uri": "gs://hireflection/Resumes/"
            },
            "batchSize": 2
          }
        }
      ]
    }
  ));
}


function sendHttpGetRequest(url, key) {
  url = url + key;
  var pdfConvReq = new XMLHttpRequest();
  /*pdfConvReq.onreadystatechange = function () {
    if (pdfConvReq.readyState == 4 && pdfConvReq.status == 200)
      callback(pdfConvReq.responseText);
  }*/

  pdfConvReq.open("GET", url, true);
  pdfConvReq.send();
}

function sendHttpGetDownloadRequest(url, callback) {
  var pdfConvReq = new XMLHttpRequest();
  pdfConvReq.onreadystatechange = function () {
    if (pdfConvReq.readyState == 4 && pdfConvReq.status == 200)
      callback(pdfConvReq.responseText);
  }

  pdfConvReq.open("GET", url, true);
  pdfConvReq.send();
}

app.listen(port, () => console.log(`Listening on port ${port}`));





/**
 * 
 * @param pageRatingArray a 2d array [Page,Rating]
 * @param dict The dictionary 
 */
function parser(pageRatingArray, dict) {
  var length = pageRatingArray.length;
  var hashMapRateArray = [];
  for (var i = 0; i < length; ++i) {
    var hashMapRate = [pageParse(pageRatingArray[i][0], dict), pageRatingArray[i][1]];
    hashMapRateArray.push(hashMapRate);
  }
  return hashMapRateArray;
}

function pageParse(page, dict) {
  //.replace(/^\s+|\s+$/g, ' ')
  var allWords = page.split(/\s+/);
  console.log(allWords);
  var length = allWords.length * 1.2;
  var hashMap = [];
  var numWords = allWords.length;

  for (var i = 0; i < length; ++i) {
    hashMap[i] = [];
  }

  for (var i = 0; i < numWords; ++i) {
    var word = removeSpecialChars(allWords[i]);
    var value = wordValue(word, length);
    if (!checkExists(hashMap[value], word)) {
      hashMap[value].push(word);
      if (dict.has(word)) {
        var dictVal = dict.get(word);
        dict.delete(word);
        dict.set(word, dictVal + 1);
      } else {
        dict.set(word, 1);
      }
    }
  }
  return hashMap;
}

function removeSpecialChars(word) {
  return word.replace(/\W/g, '');
}

function wordValue(word, max) {
  var total = 0;
  var length = word.length;
  for (var i = 0; i < length; ++i) {
    length += word.charCodeAt(i);
  }
  length = length << 5 + length;
  length = length % max;

  return Math.abs(length);
}

function checkExists(wordArray, word) {
  var length = wordArray.length;
  for (var i = 0; i < length; ++i) {
    if (wordArray[i] === word) {
      return true;
    }
  }
  return false;
}

/*
function parser(pageRateArray, dict) {
  var length = pageRateArray.length;
  var hashMapRateArray = [];
  for (var i = 0; i < length; ++i) {
    var hashMapRate = [pageParse(pageRateArray[i][0], dict), pageRateArray[i][1]];
    hashMapRateArray.push(hashMapRate);
  }
  return hashMapRateArray;
}

function pageParse(page, dict) {
  var allWords = page.replace(/^\s+|\s+$/g,'').split(/\s+/);
  var length = allWords.length * 1.2;
  var hashMap = [];
  var numWords = allWords.length;

  for (var i = 0; i < length; ++i) {
    hashMap[i] = [];
  }

  for (var i = 0; i < numWords; ++i) {
    var word = removeSpecialChars(page[i]);
    var value = wordValue(word, length);
    if (! checkExists(hashMap[value], word)) {
      hashMap[value].push(word);
      if (dict.has(word)) {
        var dictVal = dict.get(word);
        dict.delete(word);
        dict.set(word, dictVal + 1);
      } else {
        dict.set(word, 1);
      }
    }
  }
  return hashMap;
}

function removeSpecialChars(word) {
  return word.replace(/\W/g, '');
}

function wordValue(word, max) {
  var total = 0;
  var length = word.length;
  for (var i = 0; i < length; ++i) {
    length += word.charCodeAt(i);
  }
  length = length << 5 + length;
  length = length % max;

  return Math.abs(length);
}

function checkExists(wordArray, word) {
  var length = wordArray.length;
  for (var i = 0; i < length; ++i) {
    if (wordArray[i] === word) {
      return true;
    }
  }
  return false;
}F
*/



/*const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
  res.render(./src/index.js);
});

app.listen(port, () => console.log(Listening on port ${port}));
*/