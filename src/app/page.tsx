"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, RotateCcw, ArrowRight, User, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "¿Cuál es el nombre del cliente al que prestamos el servicio actualmente?",
    options: [
      "CIPA",
      "Eficol",
      "Servientrega",
      "Rappi"
    ],
    correctAnswer: 0,
    explanation: "Actualmente prestamos servicios a CIPA."
  },
  {
    id: 2,
    question: "¿Cuál es el valor que se paga por tonelada cargada?",
    options: [
      "$3.800",
      "$4.060",
      "$4.500",
      "$3.500"
    ],
    correctAnswer: 1,
    explanation: "El valor por tonelada cargada es $4.060."
  },
  {
    id: 3,
    question: "¿Cuál es el nombre del Coordinador de Operaciones?",
    options: [
      "Jair Andrés Salazar",
      "Anlly Tatiana Giraldo",
      "Jaime Gil",
      "Andrés Castaño"
    ],
    correctAnswer: 2,
    explanation: "Jaime Gil es el Coordinador de Operaciones."
  },
  {
    id: 4,
    question: "¿Qué día se paga la segunda quincena del mes?",
    options: [
      "El 1",
      "El 5",
      "El 15",
      "El 30"
    ],
    correctAnswer: 1,
    explanation: "La segunda quincena se paga el día 5 de cada mes."
  },
  {
    id: 5,
    question: "¿Cuál es el tipo de contrato que maneja la empresa para los operarios?",
    options: [
      "A término indefinido",
      "Prestación de servicios",
      "Obra o labor",
      "Temporal sin contrato"
    ],
    correctAnswer: 2,
    explanation: "La empresa maneja contratos de obra o labor para los operarios."
  },
  {
    id: 6,
    question: "¿Cuál de estos NO es un servicio ofrecido por Cargue y Logística?",
    options: [
      "Codificación",
      "Paletización",
      "Despacho",
      "Comercialización"
    ],
    correctAnswer: 3,
    explanation: "La comercialización no es un servicio ofrecido por Cargue y Logística."
  },
  {
    id: 7,
    question: "¿Cuál es el porcentaje de recargo nocturno?",
    options: [
      "25%",
      "35%",
      "50%",
      "75%"
    ],
    correctAnswer: 1,
    explanation: "El recargo nocturno es del 35%."
  },
  {
    id: 8,
    question: "¿Cuál es el horario actual del recargo nocturno en Colombia?",
    options: [
      "De 10:00 p.m. a 6:00 a.m.",
      "De 9:00 p.m. a 5:00 a.m.",
      "De 9:00 p.m. a 6:00 a.m.",
      "De 7:00 p.m. a 6:00 a.m."
    ],
    correctAnswer: 2,
    explanation: "El recargo nocturno es de 9:00 p.m. a 6:00 a.m."
  },
  {
    id: 9,
    question: "¿Qué jornada laboral aplica en 2025 según la Ley 2101?",
    options: [
      "48 horas semanales",
      "47 horas semanales",
      "45 horas semanales",
      "44 horas semanales"
    ],
    correctAnswer: 3,
    explanation: "En 2025 aplicará una jornada de 44 horas semanales según la Ley 2101."
  },
  {
    id: 10,
    question: "¿Qué valor aproximado tiene la hora extra diurna para alguien con salario mínimo?",
    options: [
      "$6.189",
      "$7.414",
      "$10.379",
      "$12.378"
    ],
    correctAnswer: 1,
    explanation: "La hora extra diurna para salario mínimo tiene un valor aproximado de $7.414."
  }
];

export default function QuizCargueLogistica() {
  const [screen, setScreen] = useState<"start" | "quiz" | "results" | "feedback">("start");
  const [employeeName, setEmployeeName] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [suggestions, setSuggestions] = useState("");
  const [isTimerActive, setIsTimerActive] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = userAnswers[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerActive && timeRemaining > 0 && screen === "quiz") {
      timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
    } else if (timeRemaining === 0 && screen === "quiz") {
      handleNext();
    }
    return () => clearTimeout(timer);
  }, [timeRemaining, isTimerActive, screen]);

  const handleStartQuiz = () => {
    if (employeeName.trim()) {
      setScreen("quiz");
      setIsTimerActive(true);
    }
  };

  const handleAnswerSelect = (value: string) => {
    if (showExplanation) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = parseInt(value);
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowExplanation(false);
      setTimeRemaining(30);
    } else {
      setShowExplanation(false);
      setScreen("results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowExplanation(false);
      setTimeRemaining(30);
    }
  };

  const handleSubmit = () => {
    setShowExplanation(true);
    setIsTimerActive(false);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers(Array(questions.length).fill(-1));
    setShowExplanation(false);
    setScreen("start");
    setEmployeeName("");
    setTimeRemaining(30);
    setIsTimerActive(false);
    setSuggestions("");
  };

  const handleViewReview = () => {
    setScreen("quiz");
    setCurrentQuestionIndex(0);
    setShowExplanation(true);
    setIsTimerActive(false);
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / questions.length) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return "¡Excelente! Dominas los conceptos de cargue y logística.";
    if (percentage >= 60) return "¡Buen trabajo! Tienes buenos conocimientos sobre logística.";
    return "Sigue estudiando para mejorar tus conocimientos en logística.";
  };

  const getScoreColor = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  // Start Screen
  if (screen === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl"
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center bg-indigo-700 text-white rounded-t-lg">
              <CardTitle className="text-3xl">Quiz: Conociendo Cargue y Logística</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-8">
              <div className="text-center">
                <div className="bg-indigo-100 rounded-full p-4 inline-block mb-4">
                  <User className="h-12 w-12 text-indigo-700" />
                </div>
                <p className="text-lg text-muted-foreground">
                  Pon a prueba tus conocimientos sobre nuestra empresa y procesos
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Instrucciones:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                  <li>10 preguntas sobre Cargue y Logística</li>
                  <li>Tiempo estimado: 5-10 minutos</li>
                  <li>30 segundos por pregunta</li>
                  <li>Selecciona la mejor respuesta</li>
                </ul>
              </div>

              <div className="space-y-4">
                <Label htmlFor="employeeName" className="text-lg font-medium">
                  Ingresa tu nombre o código de empleado
                </Label>
                <Input
                  id="employeeName"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  placeholder="Nombre o código de empleado"
                  className="text-lg py-6"
                />
              </div>

              <Button 
                onClick={handleStartQuiz} 
                disabled={!employeeName.trim()}
                className="w-full py-6 text-lg bg-indigo-700 hover:bg-indigo-800"
              >
                Comenzar Quiz
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Results Screen
  if (screen === "results") {
    const score = calculateScore();
    const percentage = getScorePercentage();

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl"
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center bg-indigo-700 text-white rounded-t-lg">
              <CardTitle className="text-3xl">Resultados del Quiz</CardTitle>
              <p className="text-indigo-200">Cargue y Logística</p>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-indigo-100 border-4 border-indigo-500 mb-4">
                  <span className={`text-4xl font-bold ${getScoreColor()}`}>{score}/{questions.length}</span>
                </div>
                <p className="text-2xl font-semibold mb-1">
                  {employeeName}, tu resultado:
                </p>
                <p className={`text-3xl font-bold ${getScoreColor()} mb-2`}>
                  {percentage}% de respuestas correctas
                </p>
                <p className="text-lg text-muted-foreground">{getScoreMessage()}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Resumen de respuestas</h3>
                <div className="space-y-3 max-h-96 overflow-y-auto p-2">
                  {questions.map((question, index) => {
                    const isCorrect = userAnswers[index] === question.correctAnswer;
                    return (
                      <div 
                        key={question.id} 
                        className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                      >
                        <div className="flex items-start gap-3">
                          {isCorrect ? (
                            <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                          ) : (
                            <XCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
                          )}
                          <div>
                            <h4 className="font-medium">{question.question}</h4>
                            <p className="text-sm mt-1">
                              <span className="font-semibold">Tu respuesta:</span> {userAnswers[index] !== -1 ? question.options[userAnswers[index]] : 'Sin responder'}
                            </p>
                            {!isCorrect && (
                              <p className="text-sm mt-1">
                                <span className="font-semibold">Respuesta correcta:</span> {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground mt-2">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">¿Tienes alguna sugerencia?</h3>
                <Textarea
                  placeholder="Déjanos tus comentarios o sugerencias para mejorar..."
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={handleViewReview} 
                  variant="outline"
                  className="py-6"
                >
                  Revisar respuestas
                </Button>
                <Button 
                  onClick={handleRestart} 
                  className="py-6 bg-indigo-700 hover:bg-indigo-800"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reiniciar Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Quiz Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center bg-indigo-700 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Quiz: Conociendo Cargue y Logística</CardTitle>
            <p className="text-indigo-200">Bienvenido {employeeName}</p>
          </CardHeader>
          <CardContent className="space-y-6 p-6">
            {/* Progress bar and timer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="w-full sm:w-2/3">
                <div className="flex justify-between text-sm text-muted-foreground mb-1">
                  <span>Pregunta {currentQuestionIndex + 1} de {questions.length}</span>
                  <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500" 
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 bg-amber-100 px-3 py-1 rounded-full">
                <Clock className="h-5 w-5 text-amber-700" />
                <span className={`font-bold ${timeRemaining <= 10 ? 'text-red-600' : 'text-amber-700'}`}>
                  {timeRemaining}s
                </span>
              </div>
            </div>

            {/* Question */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">{currentQuestion.question}</h2>
              
              <RadioGroup 
                value={selectedAnswer === -1 ? undefined : selectedAnswer.toString()} 
                onValueChange={handleAnswerSelect}
                className="space-y-3"
              >
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <RadioGroupItem 
                      value={index.toString()} 
                      id={`option-${index}`} 
                      className="border-indigo-400 text-indigo-600"
                      disabled={showExplanation}
                    />
                    <Label 
                      htmlFor={`option-${index}`} 
                      className={`text-base cursor-pointer flex-1 py-3 px-4 rounded-md border transition-colors ${
                        showExplanation 
                          ? index === currentQuestion.correctAnswer 
                            ? 'border-green-500 bg-green-50' 
                            : selectedAnswer === index 
                            ? 'border-red-500 bg-red-50' 
                            : 'border-gray-200'
                          : 'border-gray-200 hover:bg-indigo-50'
                      }`}
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`p-4 rounded-lg border ${
                    selectedAnswer === currentQuestion.correctAnswer 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {selectedAnswer === currentQuestion.correctAnswer ? (
                      <CheckCircle className="h-6 w-6 text-green-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div>
                      <p className={`font-semibold ${
                        selectedAnswer === currentQuestion.correctAnswer 
                          ? 'text-green-800' 
                          : 'text-red-800'
                      }`}>
                          {selectedAnswer === currentQuestion.correctAnswer ? '¡Correcto!' : 'Respuesta incorrecta'}
  </p>
  <p className="text-sm text-muted-foreground mt-2">
    {currentQuestion.explanation}
  </p>
</div>
</div>
</motion.div>
)}
</AnimatePresence>

{/* Navigation buttons */}
<div className="flex justify-between">
  <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
    Anterior
  </Button>
  {!showExplanation ? (
    <Button onClick={handleSubmit} disabled={selectedAnswer === -1}>
      Ver Explicación
    </Button>
  ) : (
    <Button onClick={handleNext}>
      Siguiente <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  )}
</div>
</CardContent>
</Card>
</motion.div>
</div>
);
}
