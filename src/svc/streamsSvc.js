


export async function GetAllStreams() {
    const response = await fetch("https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=ut&indent=on&siteStatus=active&siteType=ST");
    const allStreamData = await response.json();

    const condensedStreamsData = {};


    allStreamData.value.timeSeries.forEach(timeSeries => {
        const siteName = timeSeries.sourceInfo.siteName;
        var variable = timeSeries.variable.variableDescription.toLowerCase();
        const unit = timeSeries.variable.unit.unitCode;
        const streamflowData = timeSeries.values[0].value[0];


        if (variable.includes('temperature, water') || variable.includes('discharge')) {
            if(variable.includes('temperature, water')){
                variable = "Temperature";
            }
            else if (variable.includes('discharge')){
                variable = "Discharge";
            }

            const key =  siteName;

            if (!condensedStreamsData[key]) {
                condensedStreamsData[key] = {
                    Site: siteName,
                    [variable]: {
                        Unit: unit,
                        Value: streamflowData
                    }
                }
            }
            else {
                condensedStreamsData[key][variable] = {
                    Unit: unit,
                    Value: streamflowData,
                }
            }
        }
    })

    const allStreamsCurrentData = Object.values(condensedStreamsData);

    console.log("all streams (in svc): ", allStreamsCurrentData);
    return allStreamsCurrentData;
}

export default {
    GetAllStreams
}