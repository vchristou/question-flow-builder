
import React, { useState, useEffect } from "react";
import { Question, QuestionOption } from "../types/questionnaire";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  onNext: (selectedOptions: QuestionOption[]) => void;
  onBack: () => void;
  canGoBack: boolean;
  previousSelections?: QuestionOption[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onNext,
  onBack,
  canGoBack,
  previousSelections = [],
}) => {
  const [selectedOptions, setSelectedOptions] = useState<QuestionOption[]>(previousSelections);
  const isRadioType = question.QuestionSelectType === 0;

  useEffect(() => {
    // Update selected options when previous selections change
    setSelectedOptions(previousSelections);
  }, [previousSelections, question.Id]);

  const handleOptionSelect = (option: QuestionOption) => {
    if (isRadioType) {
      // Radio button mode: only one selection allowed
      setSelectedOptions([option]);
    } else {
      // Checkbox mode: multiple selections allowed
      const isSelected = selectedOptions.some(selected => selected.Id === option.Id);
      
      if (isSelected) {
        // Remove option if already selected
        setSelectedOptions(selectedOptions.filter(selected => selected.Id !== option.Id));
      } else {
        // Add option if not selected
        setSelectedOptions([...selectedOptions, option]);
      }
    }
  };

  const handleNext = () => {
    onNext(selectedOptions);
  };

  const isOptionSelected = (option: QuestionOption) => {
    return selectedOptions.some(selected => selected.Id === option.Id);
  };

  const canContinue = question.IsOptional || selectedOptions.length > 0;

  return (
    <div className="questionnaire-container">
      <h2 className="question-title">{question.Question}</h2>
      
      <div className="option-container">
        {question.Options.map((option) => (
          <div 
            key={option.Id} 
            className={cn(
              "option-item",
              isOptionSelected(option) && "selected"
            )}
            onClick={() => handleOptionSelect(option)}
          >
            <div className="flex items-center">
              <div className={cn(
                "w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center",
                isOptionSelected(option) && "border-primary"
              )}>
                {isOptionSelected(option) && (
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                )}
              </div>
              <span className="option-label">{option.Answer}</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="navigation-buttons">
        <Button 
          variant="outline" 
          onClick={onBack} 
          disabled={!canGoBack}
          className={cn("flex items-center gap-1", !canGoBack && "opacity-0 pointer-events-none")}
        >
          <ArrowLeft className="h-4 w-4" />
          Πίσω
        </Button>
        
        <Button 
          onClick={handleNext} 
          disabled={!canContinue}
          className="ml-auto flex items-center gap-1"
        >
          Επόμενο
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;
