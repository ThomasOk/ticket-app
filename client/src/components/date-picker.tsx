import { format } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
	id: string;
	name: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
};

export const DatePicker = ({
	id,
	name,
	defaultValue,
	onChange,
}: DatePickerProps) => {
	const [date, setDate] = useState<Date | undefined>(
		defaultValue ? new Date(defaultValue) : new Date()
	);
	const [open, setOpen] = useState(false);

	// const handleSelect = (selectedDate: Date | undefined) => {
	// 	setDate(selectedDate);
	// 	setOpen(false);
	// };

	const handleSelect = (newDate: Date | undefined) => {
		setDate(newDate);
		if (newDate && onChange) {
			onChange(format(newDate, "yyyy-MM-dd"));
		}
		setOpen(false);
	};

	const formattedStringDate = date ? format(date, "yyyy-MM-dd") : "";

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger id={id} className="w-full" asChild>
				<Button
					variant="outline"
					className="w-full h-12 px-3 justify-start text-left font-normal"
				>
					<LucideCalendar className="mr-2 h-4 w-4" />
					{formattedStringDate}
					<input type="hidden" name={name} value={formattedStringDate} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={handleSelect}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};
