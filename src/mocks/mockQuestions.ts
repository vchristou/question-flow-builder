
import { Question } from '../types/questionnaire';

// Mock data structure based on the expected API response format
export const mockQuestions: Question[] = [
  {
    Id: 1000,
    Question: "Ποιόν αφορά η συνεδρία;",
    QuestionSelectType: 0, // Radio button
    IsOptional: false,
    Options: [
      {
        Id: 1001,
        AnswerId: 1001,
        Answer: "Ενήλικα",
        Action: "GoToQuestion",
        GoToQuestionId: 1100,
        FilterQueryStringKey: "age",
        FilterQueryStringValue: "adult"
      },
      {
        Id: 1002,
        AnswerId: 1002,
        Answer: "Παιδί/Έφηβο",
        Action: "GoToQuestion",
        GoToQuestionId: 1100,
        FilterQueryStringKey: "age",
        FilterQueryStringValue: "child"
      },
      {
        Id: 1003,
        AnswerId: 1003,
        Answer: "Ζευγάρι",
        Action: "GoToQuestion",
        GoToQuestionId: 1100,
        FilterQueryStringKey: "age",
        FilterQueryStringValue: "couple"
      }
    ]
  },
  {
    Id: 1100,
    Question: "Τι είδους υποστήριξη χρειάζεσαι;",
    QuestionSelectType: 0, // Radio button
    IsOptional: false,
    Options: [
      {
        Id: 1101,
        AnswerId: 1101,
        Answer: "Ψυχολογική υποστήριξη",
        Action: "GoToQuestion",
        GoToQuestionId: 1200,
        FilterQueryStringKey: "support",
        FilterQueryStringValue: "psychological"
      },
      {
        Id: 1102,
        AnswerId: 1102,
        Answer: "Συμβουλευτική",
        Action: "GoToQuestion",
        GoToQuestionId: 1200,
        FilterQueryStringKey: "support",
        FilterQueryStringValue: "counseling"
      },
      {
        Id: 1103,
        AnswerId: 1103,
        Answer: "Αναζητώ Ψυχίατρο",
        Action: "GoToQuestion",
        GoToQuestionId: 1200,
        FilterQueryStringKey: "spec",
        FilterQueryStringValue: "Psychiatros"
      }
    ]
  },
  {
    Id: 1200,
    Question: "Ποιο είναι το θέμα που σε απασχολεί;",
    QuestionSelectType: 1, // Checkbox
    IsOptional: true,
    Options: [
      {
        Id: 1201,
        AnswerId: 1201,
        Answer: "Άγχος",
        Action: "GoToQuestion",
        GoToQuestionId: 1300,
        FilterQueryStringKey: "sf",
        FilterQueryStringValue: "agxos"
      },
      {
        Id: 1202,
        AnswerId: 1202,
        Answer: "Κατάθλιψη",
        Action: "GoToQuestion",
        GoToQuestionId: 1300,
        FilterQueryStringKey: "sf",
        FilterQueryStringValue: "katathlipsi"
      },
      {
        Id: 1203,
        AnswerId: 1203,
        Answer: "Θεραπεία ζεύγους",
        Action: "GoToQuestion",
        GoToQuestionId: 1300,
        FilterQueryStringKey: "sf",
        FilterQueryStringValue: "therapeia-zeygous"
      }
    ]
  },
  {
    Id: 1300,
    Question: "Πώς θα ήθελες να γίνει η συνεδρία;",
    QuestionSelectType: 0, // Radio button
    IsOptional: false,
    Options: [
      {
        Id: 1301,
        AnswerId: 1301,
        Answer: "Με βιντεοκλήση",
        Action: "GoToUrl",
        GoToQuestionId: 0,
        FilterQueryStringKey: "vcf",
        FilterQueryStringValue: "availablevideocall"
      },
      {
        Id: 1302,
        AnswerId: 1302,
        Answer: "Με φυσική παρουσία",
        Action: "GoToUrl",
        GoToQuestionId: 0,
        FilterQueryStringKey: "visit",
        FilterQueryStringValue: "office"
      },
      {
        Id: 1303,
        AnswerId: 1303,
        Answer: "Δεν έχω προτίμηση",
        Action: "GoToUrl",
        GoToQuestionId: 0,
        FilterQueryStringKey: "",
        FilterQueryStringValue: ""
      }
    ]
  }
];
