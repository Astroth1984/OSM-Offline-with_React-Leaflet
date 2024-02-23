import { useEffect, useState } from "react";
import { v4 } from "uuid";

export const useMappedInputs = (filtersDef, markers) => {
    const [mappedInputs, setMappedInputs] = useState([]);
    useEffect(() => {
        const generateMappedInputs = () => {
            setMappedInputs((prevMappedInputs) => {
                const result = [...prevMappedInputs];
                filtersDef.forEach((filter) => {
                    filter.inputsId.forEach((inputId) => {
                        const input = markers.find((marker) => parseInt(marker.id).toString() === inputId);
                        if(input) {
                            const existingMappedInput = result.find((el) => 
                                    el.filterDef.filterDefId === filter.filterDefId && 
                                    JSON.stringify(el.center) === JSON.stringify(input.geocode)
                            );
                            if(!existingMappedInput) {
                                const mappedInput = {
                                    id: v4(),
                                    filterDef: filter,
                                    center: input.geocode
                                };
                                result.push(mappedInput)
                            }
                        }
                    })
                });
                return result;
            })
        }
        generateMappedInputs();
    }, [filtersDef, markers]);
    return mappedInputs;
};