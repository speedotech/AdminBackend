import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './models/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadStatusDto } from './dto/update-lead-status.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadsRepository: Repository<Lead>,
  ) {}

  private async validateLeadExists(id: number): Promise<Lead> {
    const lead = await this.leadsRepository.findOne({ where: { lead_id: id } });
    if (!lead) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }
    return lead;
  }

  private async validateEmailUnique(email: string, excludeId?: number): Promise<void> {
    const existingLead = await this.leadsRepository.findOne({
      where: { email, ...(excludeId && { id: excludeId }) },
    });
    if (existingLead) {
      throw new BadRequestException('Email already exists');
    }
  }

  async findAll(page = 1, limit = 10, filters: any = {}) {
    const skip = (page - 1) * limit;
    const where: any = {};
    if (filters.status) where.status = filters.status;
    if (filters.source) where.source = filters.source;

    const [data, total] = await this.leadsRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { created_on: 'DESC' },
    });

    return {
      success: true,
      data,
      total,
      page,
      limit,
    };
  }

  async findOne(id: number): Promise<Lead> {
    return this.validateLeadExists(id);
  }

  async create(leadData: CreateLeadDto): Promise<Lead> {
    try {
      await this.validateEmailUnique(leadData.email);
      const lead = this.leadsRepository.create(leadData);
      return await this.leadsRepository.save(lead);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An error occurred while creating the lead');
    }
  }

  async update(id: number, leadData: Partial<CreateLeadDto>): Promise<Lead> {
    try {
      await this.validateLeadExists(id);
      if (leadData.email) {
        await this.validateEmailUnique(leadData.email, id);
      }
      await this.leadsRepository.update(id, leadData);
      return this.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An error occurred while updating the lead');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.validateLeadExists(id);
      await this.leadsRepository.delete(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An error occurred while deleting the lead');
    }
  }

  async updateStatus({ id, status }: UpdateLeadStatusDto): Promise<Lead> {
    try {
      await this.validateLeadExists(id);
      await this.leadsRepository.update(id, { status });
      return this.findOne(id);
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('An error occurred while updating the lead status');
    }
  }
}
