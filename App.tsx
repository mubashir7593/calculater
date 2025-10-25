
import React, { useState, useCallback } from 'react';
import Display from './components/Display';
import CalculatorButton from './components/CalculatorButton';

const App: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);

  const clearAll = useCallback(() => {
    setDisplayValue('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  }, []);

  const toggleSign = useCallback(() => {
    if (displayValue !== '0') {
      setDisplayValue((prev) => (parseFloat(prev) * -1).toString());
    }
  }, [displayValue]);

  const inputPercent = useCallback(() => {
    const currentValue = parseFloat(displayValue);
    setDisplayValue((currentValue / 100).toString());
  }, [displayValue]);

  const inputDigit = useCallback((digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  }, [displayValue, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  }, [displayValue, waitingForOperand]);

  const performOperation = useCallback((nextOperation: string) => {
    const inputValue = parseFloat(displayValue);

    const performCalculation = (prev: number, current: number, op: string): number => {
      switch (op) {
        case '+': return prev + current;
        case '-': return prev - current;
        case '×': return prev * current;
        case '÷': return prev / current;
        default: return current;
      }
    };

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const result = performCalculation(previousValue, inputValue, operation);
      setPreviousValue(result);
      setDisplayValue(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);

    if (nextOperation === '=') {
        if(previousValue !== null && operation) {
            const result = performCalculation(previousValue, inputValue, operation);
            setPreviousValue(null);
            setDisplayValue(String(result));
            setOperation(null);
        }
    }
  }, [displayValue, operation, previousValue]);


  const buttonLayout = [
    { label: 'AC', action: clearAll, className: 'bg-gray-400 text-black' },
    { label: '+/-', action: toggleSign, className: 'bg-gray-400 text-black' },
    { label: '%', action: inputPercent, className: 'bg-gray-400 text-black' },
    { label: '÷', action: () => performOperation('÷'), className: 'bg-orange-500 text-white' },
    { label: '7', action: () => inputDigit('7') },
    { label: '8', action: () => inputDigit('8') },
    { label: '9', action: () => inputDigit('9') },
    { label: '×', action: () => performOperation('×'), className: 'bg-orange-500 text-white' },
    { label: '4', action: () => inputDigit('4') },
    { label: '5', action: () => inputDigit('5') },
    { label: '6', action: () => inputDigit('6') },
    { label: '-', action: () => performOperation('-'), className: 'bg-orange-500 text-white' },
    { label: '1', action: () => inputDigit('1') },
    { label: '2', action: () => inputDigit('2') },
    { label: '3', action: () => inputDigit('3') },
    { label: '+', action: () => performOperation('+'), className: 'bg-orange-500 text-white' },
    { label: '0', action: () => inputDigit('0'), className: 'col-span-2' },
    { label: '.', action: inputDecimal },
    { label: '=', action: () => performOperation('='), className: 'bg-orange-500 text-white' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xs sm:max-w-sm mx-auto bg-black rounded-3xl shadow-2xl p-4 space-y-4">
        <Display value={displayValue} />
        <div className="grid grid-cols-4 gap-3">
          {buttonLayout.map(({ label, action, className = '' }) => (
            <CalculatorButton key={label} onClick={action} className={className}>
              {label}
            </CalculatorButton>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
