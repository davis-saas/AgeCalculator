import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths, format, isAfter, isBefore } from "date-fns";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Baby, Target, RotateCcw, CalendarDays, Share2, Moon, Sun, HelpCircle, Info } from "lucide-react";

const ageFormSchema = z.object({
  birthDay: z.string().min(1, "Day is required").refine((val) => {
    const day = parseInt(val);
    return day >= 1 && day <= 31;
  }, "Day must be between 1 and 31"),
  birthMonth: z.string().min(1, "Month is required").refine((val) => {
    const month = parseInt(val);
    return month >= 1 && month <= 12;
  }, "Month must be between 1 and 12"),
  birthYear: z.string().min(1, "Year is required").refine((val) => {
    const year = parseInt(val);
    return year >= 1900 && year <= new Date().getFullYear();
  }, "Year must be valid"),
  targetDay: z.string().min(1, "Day is required").refine((val) => {
    const day = parseInt(val);
    return day >= 1 && day <= 31;
  }, "Day must be between 1 and 31"),
  targetMonth: z.string().min(1, "Month is required").refine((val) => {
    const month = parseInt(val);
    return month >= 1 && month <= 12;
  }, "Month must be between 1 and 12"),
  targetYear: z.string().min(1, "Year is required").refine((val) => {
    const year = parseInt(val);
    return year >= 1900 && year <= new Date().getFullYear() + 10;
  }, "Year must be valid")
}).refine((data) => {
  if (!data.birthDay || !data.birthMonth || !data.birthYear || !data.targetDay || !data.targetMonth || !data.targetYear) {
    return true; // Let individual field validation handle empty values
  }
  const birth = new Date(parseInt(data.birthYear), parseInt(data.birthMonth) - 1, parseInt(data.birthDay));
  const target = new Date(parseInt(data.targetYear), parseInt(data.targetMonth) - 1, parseInt(data.targetDay));
  return !isAfter(birth, target);
}, {
  message: "Birth date cannot be after the target date",
  path: ["targetYear"]
});

type AgeFormData = z.infer<typeof ageFormSchema>;

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [ageResult, setAgeResult] = useState<AgeResult | null>(null);
  const [birthCalendarOpen, setBirthCalendarOpen] = useState(false);
  const [targetCalendarOpen, setTargetCalendarOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<AgeFormData>({
    resolver: zodResolver(ageFormSchema),
    defaultValues: {
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      targetDay: "",
      targetMonth: "",
      targetYear: ""
    }
  });

  const { watch, setValue, formState: { errors } } = form;
  const birthDay = watch("birthDay");
  const birthMonth = watch("birthMonth");
  const birthYear = watch("birthYear");
  const targetDay = watch("targetDay");
  const targetMonth = watch("targetMonth");
  const targetYear = watch("targetYear");

  // Calculate age whenever dates change
  useEffect(() => {
    if (birthDay && birthMonth && birthYear && targetDay && targetMonth && targetYear) {
      const birth = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
      const target = new Date(parseInt(targetYear), parseInt(targetMonth) - 1, parseInt(targetDay));
      
      if (!isAfter(birth, target)) {
        const years = differenceInYears(target, birth);
        const monthsAfterYears = differenceInMonths(target, addYears(birth, years));
        const daysAfterMonths = differenceInDays(target, addMonths(addYears(birth, years), monthsAfterYears));
        
        const totalDays = differenceInDays(target, birth);
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = differenceInMonths(target, birth);

        setAgeResult({
          years,
          months: monthsAfterYears,
          days: daysAfterMonths,
          totalDays,
          totalWeeks,
          totalMonths
        });
      } else {
        setAgeResult(null);
      }
    } else {
      setAgeResult(null);
    }
  }, [birthDay, birthMonth, birthYear, targetDay, targetMonth, targetYear]);

  // Theme toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !isDark ? 'dark' : 'light');
  };

  const clearDates = () => {
    setValue("birthDay", "");
    setValue("birthMonth", "");
    setValue("birthYear", "");
    setValue("targetDay", "");
    setValue("targetMonth", "");
    setValue("targetYear", "");
    setAgeResult(null);
  };

  const handleBirthDateSelect = (date: Date | undefined) => {
    if (date) {
      setValue("birthDay", date.getDate().toString());
      setValue("birthMonth", (date.getMonth() + 1).toString());
      setValue("birthYear", date.getFullYear().toString());
      setBirthCalendarOpen(false);
    }
  };

  const handleTargetDateSelect = (date: Date | undefined) => {
    if (date) {
      setValue("targetDay", date.getDate().toString());
      setValue("targetMonth", (date.getMonth() + 1).toString());
      setValue("targetYear", date.getFullYear().toString());
      setTargetCalendarOpen(false);
    }
  };

  const setToday = () => {
    const today = new Date();
    setValue("targetDay", today.getDate().toString().padStart(2, '0'));
    setValue("targetMonth", (today.getMonth() + 1).toString().padStart(2, '0'));
    setValue("targetYear", today.getFullYear().toString());
  };

  const shareResult = async () => {
    if (!ageResult || !targetDay || !targetMonth || !targetYear) return;
    
    const targetDate = new Date(parseInt(targetYear), parseInt(targetMonth) - 1, parseInt(targetDay));
    const shareText = `On ${format(targetDate, 'MMMM dd, yyyy')}, I was exactly ${ageResult.years} years, ${ageResult.months} months, and ${ageResult.days} days old.`;
    
    try {
      await navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied to clipboard!",
        description: "Age calculation result has been copied to your clipboard.",
      });
    } catch {
      toast({
        title: "Unable to copy",
        description: "Please copy the result manually.",
        variant: "destructive"
      });
    }
  };





  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center">
                <Calendar className="text-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Age Calculator</h1>
                <p className="text-sm text-muted-foreground">Calculate your exact age on any date</p>
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="icon"
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
              className="w-10 h-10"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <Card className="p-8 shadow-lg">
          {/* Instructions */}
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold mb-2">Calculate Exact Age</h2>
            <p className="text-muted-foreground">Enter your birth date and target date to see your exact age</p>
          </div>

          {/* Date Input Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Birth Date */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold flex items-center">
                <Baby className="text-primary mr-2 h-4 w-4" />
                Birth Date
              </Label>
              <div className="flex items-start gap-2">
                <div className="grid grid-cols-3 gap-2 flex-1">
                  <div>
                    <Input
                      type="number"
                      placeholder="DD"
                      min="1"
                      max="31"
                      {...form.register("birthDay")}
                      data-testid="input-birth-day"
                    />
                    {errors.birthDay && (
                      <p className="text-xs text-destructive mt-1">{errors.birthDay.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="MM"
                      min="1"
                      max="12"
                      {...form.register("birthMonth")}
                      data-testid="input-birth-month"
                    />
                    {errors.birthMonth && (
                      <p className="text-xs text-destructive mt-1">{errors.birthMonth.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="YYYY"
                      min="1900"
                      max={new Date().getFullYear()}
                      {...form.register("birthYear")}
                      data-testid="input-birth-year"
                    />
                    {errors.birthYear && (
                      <p className="text-xs text-destructive mt-1">{errors.birthYear.message}</p>
                    )}
                  </div>
                </div>
                <Popover open={birthCalendarOpen} onOpenChange={setBirthCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 px-3"
                      data-testid="button-birth-calendar"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={birthDay && birthMonth && birthYear ? new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay)) : undefined}
                      onSelect={handleBirthDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-xs text-muted-foreground">The date you were born (DD, MM, YYYY)</p>
            </div>

            {/* Target Date */}
            <div className="space-y-4">
              <Label className="text-sm font-semibold flex items-center">
                <Target className="text-primary mr-2 h-4 w-4" />
                Target Date
              </Label>
              <div className="flex items-start gap-2">
                <div className="grid grid-cols-3 gap-2 flex-1">
                  <div>
                    <Input
                      type="number"
                      placeholder="DD"
                      min="1"
                      max="31"
                      {...form.register("targetDay")}
                      data-testid="input-target-day"
                    />
                    {errors.targetDay && (
                      <p className="text-xs text-destructive mt-1">{errors.targetDay.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="MM"
                      min="1"
                      max="12"
                      {...form.register("targetMonth")}
                      data-testid="input-target-month"
                    />
                    {errors.targetMonth && (
                      <p className="text-xs text-destructive mt-1">{errors.targetMonth.message}</p>
                    )}
                  </div>
                  <div>
                    <Input
                      type="number"
                      placeholder="YYYY"
                      min="1900"
                      max={new Date().getFullYear() + 10}
                      {...form.register("targetYear")}
                      data-testid="input-target-year"
                    />
                    {errors.targetYear && (
                      <p className="text-xs text-destructive mt-1">{errors.targetYear.message}</p>
                    )}
                  </div>
                </div>
                <Popover open={targetCalendarOpen} onOpenChange={setTargetCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 px-3"
                      data-testid="button-target-calendar"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={targetDay && targetMonth && targetYear ? new Date(parseInt(targetYear), parseInt(targetMonth) - 1, parseInt(targetDay)) : undefined}
                      onSelect={handleTargetDateSelect}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <p className="text-xs text-muted-foreground">The date to calculate age for (DD, MM, YYYY)</p>
            </div>
          </div>

          {/* Results Section */}
          {ageResult && (
            <div className="result-card rounded-xl border border-border p-8 text-center">
              <h3 className="text-lg font-semibold mb-6">Your exact age on the target date:</h3>
              
              {/* Age Display */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
                  <div className="text-4xl font-bold text-primary mb-2" data-testid="text-years">
                    {ageResult.years}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Years</div>
                </div>

                <div className="bg-accent/20 rounded-lg p-6 border border-accent/30">
                  <div className="text-4xl font-bold text-accent-foreground mb-2" data-testid="text-months">
                    {ageResult.months}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Months</div>
                </div>

                <div className="bg-secondary rounded-lg p-6 border border-border">
                  <div className="text-4xl font-bold text-secondary-foreground mb-2" data-testid="text-days">
                    {ageResult.days}
                  </div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Days</div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="bg-muted/30 rounded-lg p-6 border border-muted">
                <h4 className="font-semibold mb-3">Detailed Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Days:</span>
                    <span className="font-mono font-semibold" data-testid="text-total-days">
                      {ageResult.totalDays.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Weeks:</span>
                    <span className="font-mono font-semibold" data-testid="text-total-weeks">
                      {ageResult.totalWeeks.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Months:</span>
                    <span className="font-mono font-semibold" data-testid="text-total-months">
                      {ageResult.totalMonths.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Summary Text */}
              <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-lg">
                  On <span className="font-semibold text-primary" data-testid="text-target-formatted">
                    {targetDay && targetMonth && targetYear ? format(new Date(parseInt(targetYear), parseInt(targetMonth) - 1, parseInt(targetDay)), 'MMMM dd, yyyy') : 'the target date'}
                  </span>, 
                  you were exactly <span className="font-bold text-primary" data-testid="text-age-summary">
                    {ageResult.years} years, {ageResult.months} months, and {ageResult.days} days
                  </span> old.
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button
              onClick={clearDates}
              data-testid="button-clear"
              className="flex-1"
              variant="default"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear Dates
            </Button>
            
            <Button
              onClick={setToday}
              data-testid="button-today"
              className="flex-1"
              variant="secondary"
            >
              <CalendarDays className="mr-2 h-4 w-4" />
              Use Today
            </Button>
            
            <Button
              onClick={shareResult}
              data-testid="button-share"
              className="flex-1"
              variant="outline"
              disabled={!ageResult}
            >
              <Share2 className="mr-2 h-4 w-4" />
              Share Result
            </Button>
          </div>

        </Card>

      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">
                Calculate your exact age with precision down to the day
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                All calculations are performed locally in your browser
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" data-testid="button-help">
                <HelpCircle className="mr-1 h-4 w-4" />
                Help
              </Button>
              <Button variant="ghost" size="sm" data-testid="button-about">
                <Info className="mr-1 h-4 w-4" />
                About
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
