

import * as Select from "@radix-ui/react-select";
import React from "react";

export interface SimpleSelectProps {
	collection: string[];
	value: string;
	onValueChange: (value: string) => void;
}

export const SimpleSelect: React.FC<SimpleSelectProps> = ({ collection, value, onValueChange }) => (
	<Select.Root value={value} onValueChange={onValueChange}>
		<Select.Trigger className="w-[80px] h-8 text-xs border rounded px-2">
			<Select.Value placeholder="Select..." />
		</Select.Trigger>
		<Select.Content>
			{collection.map((item) => (
				<Select.Item key={item} value={item} className="text-xs px-2 py-1">
					{item}
				</Select.Item>
			))}
		</Select.Content>
	</Select.Root>
);
