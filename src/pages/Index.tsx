
import React, { useState, useEffect } from "react";
import { 
  fetchQuestions, 
  constructFinalUrl 
} from "../services/questionnaireService";
import { Question, QuestionOption, UserSelectionHistory } from "../types/questionnaire";
import QuestionCard from "../components/QuestionCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorDialog from "../components/ErrorDialog";
import ResultPage from "../components/ResultPage";
import ProgressBar from "../components/ProgressBar";

const Index = () => {
  // State for questions and current question
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  
  // State for tracking user journey
  const [questionPath, setQuestionPath] = useState<number[]>([]);
  const [selectionHistory, setSelectionHistory] = useState<UserSelectionHistory>({});
  const [finalUrl, setFinalUrl] = useState<string | null>(null);

  // Load questions on component mount
  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      
      // Store questions in the global cache
      window.cachedQuestions = fetchedQuestions;
      
      // Find the first question (usually with ID 1000)
      const startQuestions = fetchedQuestions.filter(q => q.Id === 1000);
      
      if (startQuestions.length > 0) {
        setCurrentQuestion(startQuestions[0]);
        setQuestionPath([startQuestions[0].Id]);
      } else {
        throw new Error("Δεν βρέθηκε η πρώτη ερώτηση");
      }
    } catch (err) {
      console.error("Failed to load questions:", err);
      setError("Δεν ήταν δυνατή η φόρτωση των ερωτήσεων. Παρακαλώ προσπαθήστε ξανά.");
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = (selectedOptions: QuestionOption[]) => {
    if (!currentQuestion || selectedOptions.length === 0) {
      // If the question is optional and no options selected, we need to handle this case
      if (currentQuestion?.IsOptional) {
        resetFlow();
        return;
      }
      return;
    }
    
    // Update selection history
    setSelectionHistory(prev => ({
      ...prev,
      [currentQuestion.Id]: selectedOptions
    }));

    const selectedOption = selectedOptions[0]; // For simplicity, using the first selected option for navigation
    
    if (selectedOption.Action === "GoToUrl") {
      // End of the flow - construct the final URL
      const userSelections = new Map<number, number[]>();
      
      // Process all selections in the history
      Object.entries(selectionHistory).forEach(([questionId, options]) => {
        userSelections.set(
          parseInt(questionId), 
          options.map(opt => opt.Id)
        );
      });
      
      // Add the current selection
      userSelections.set(
        currentQuestion.Id, 
        selectedOptions.map(opt => opt.Id)
      );
      
      // Create the final URL
      const constructedUrl = constructFinalUrl(userSelections);
      setFinalUrl(constructedUrl);
      return;
    }
    
    // Find the next question
    const nextQuestionId = selectedOption.GoToQuestionId;
    const nextQuestion = questions.find(q => q.Id === nextQuestionId);
    
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setQuestionPath(prev => [...prev, nextQuestion.Id]);
    } else {
      setError(`Δεν βρέθηκε η επόμενη ερώτηση (ID: ${nextQuestionId})`);
      setShowErrorDialog(true);
    }
  };

  const handleBack = () => {
    if (questionPath.length <= 1) return;
    
    // Remove the current question from the path
    const newPath = [...questionPath];
    newPath.pop();
    
    // Get the previous question ID
    const prevQuestionId = newPath[newPath.length - 1];
    const prevQuestion = questions.find(q => q.Id === prevQuestionId);
    
    if (prevQuestion) {
      setCurrentQuestion(prevQuestion);
      setQuestionPath(newPath);
    }
  };

  const resetFlow = () => {
    // Reset to the first question
    const startQuestion = questions.find(q => q.Id === 1000);
    
    if (startQuestion) {
      setCurrentQuestion(startQuestion);
      setQuestionPath([startQuestion.Id]);
      setSelectionHistory({});
      setFinalUrl(null);
    }
  };

  // Calculate progress for the progress bar
  const calculateProgress = () => {
    if (!currentQuestion || finalUrl) return { current: 1, total: 1 };
    
    // Simple approach: use the path length as progress
    return {
      current: questionPath.length,
      // Estimate total as current + 3 (a rough estimate)
      total: Math.max(7, questionPath.length + 3)
    };
  };

  const progress = calculateProgress();

  // Show loading state
  if (isLoading) {
    return (
      <div className="questionnaire-container">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Doctoranytime Ερωτηματολόγιο</h1>
        <LoadingSpinner />
      </div>
    );
  }

  // If we have a final URL, show the results page
  if (finalUrl) {
    return (
      <div className="min-h-screen flex flex-col pt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Doctoranytime Ερωτηματολόγιο</h1>
        <ResultPage finalUrl={finalUrl} onReset={resetFlow} />
      </div>
    );
  }

  // Show the current question
  return (
    <div className="min-h-screen flex flex-col pt-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">Doctoranytime Ερωτηματολόγιο</h1>
      
      <div className="questionnaire-container">
        <ProgressBar 
          currentStep={progress.current} 
          totalSteps={progress.total} 
        />
        
        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            onNext={handleNext}
            onBack={handleBack}
            canGoBack={questionPath.length > 1}
            previousSelections={selectionHistory[currentQuestion.Id] || []}
          />
        )}
      </div>

      <ErrorDialog
        isOpen={showErrorDialog}
        onClose={() => setShowErrorDialog(false)}
        message={error || "Παρουσιάστηκε κάποιο σφάλμα"}
        retry={loadQuestions}
      />
    </div>
  );
};

export default Index;
