import {toSvg} from "jdenticon";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"

export const GetIcon = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
    const iconName: string = event.path.startsWith('/') ? event.path.substring(1) : event.path

    const svgString = toSvg(iconName ?? "Suella", 256)

    return {
        statusCode: 200,
        body: svgString,
        headers: {
            "Content-Type": "image/svg+xml"
        }
    };
};
