import { useState } from "react";

export function useDisabled(pendingRequest: Promise<void>){
	const [disabled, setDisabled] = useState(false);

	setDisabled(true);
	pendingRequest.finally(() => setDisabled(false))

	return {
		disabled
	}
}