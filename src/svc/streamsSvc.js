
//streamflow contains the value as well as the time retrieved -- probably want to display both

export async function GetAllStreams() {
    const response = await fetch("https://waterservices.usgs.gov/nwis/iv/?format=json&stateCd=ut&indent=on&siteStatus=active&siteType=ST");
    const allStreamData = await response.json();

    const allStreamsCurrentData = allStreamData.value.timeSeries
        .filter(timeSeries => {
            const variable = timeSeries.variable.variableDescription.toLowerCase();
            return variable.includes('temperature, water') || variable.includes('discharge');
        })
        .map(timeSeries => {
            const siteName = timeSeries.sourceInfo.siteName;
            const variable = timeSeries.variable.variableDescription;
            const unit = timeSeries.variable.unit.unitCode;
            const streamflowData = timeSeries.values[0].value[0];

            return {
                Site: siteName,
                Variable: variable,
                Unit: unit,
                StreamFlow: streamflowData,
            };
        })

    return allStreamsCurrentData;
}

export default {
    GetAllStreams
}