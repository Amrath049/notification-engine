import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './schemas/client.schema';
import { Model } from 'mongoose';
import { CreateClientDto } from './dto/create-client.dto';
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client.name)
    private clientModel: Model<ClientDocument>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const existing = await this.clientModel.findOne({
      email: createClientDto.email,
    });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword: string = await bcrypt.hash(
      createClientDto.password,
      10,
    );

    const createdClient = new this.clientModel({
      ...createClientDto,
      password: hashedPassword,
    });

    return createdClient.save();
  }

  async findByEmail(email: string) {
    return await this.clientModel.findOne({ email });
  }
}
