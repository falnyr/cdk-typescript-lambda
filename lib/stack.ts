import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda-nodejs";
import * as apigateway from "@aws-cdk/aws-apigateway";

export class MyWidgetServiceStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const handler = new lambda.NodejsFunction(this, 'IconHandler', {
      entry: __dirname + "/../resources/icon.ts",
      handler: 'GetIcon',
    });

    const api = new apigateway.RestApi(this, "icons-api", {
      restApiName: "Icon Service",
      description: "Provides jdenticons."
    });

    const getWidgetsIntegration = new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    });

    api.root.addMethod("GET", getWidgetsIntegration); // GET /

    const icon = api.root.addResource("{icon}");
    const getIconIntegration = new apigateway.LambdaIntegration(handler);
    icon.addMethod("GET", getIconIntegration); // GET /{id}
  }
}
