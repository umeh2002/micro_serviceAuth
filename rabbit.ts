

import amqp from "amqplib";
const amqpServer = "amqp://localhost:5672";
let channel: any;
let connect: any;

const connection = async (queue: string) => {
  connect = await amqp.connect(amqpServer);
  channel = await connect.createChannel();

  await channel.assertQueue(queue);
};

export { connect, connection, channel };