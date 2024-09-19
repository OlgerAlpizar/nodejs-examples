import User, { UserSchemaModel } from '../models/user'
import SearchUser from '../models/search-user'
import bcrypt from 'bcryptjs'
import {PaginationResults} from '../../commons/models/pagination-results'
import { FilterQuery } from 'mongoose'

export const create = async (newUser: User): Promise<User> => {
    const exists = await UserSchemaModel.findOne({ email: newUser.email })
  
    if (exists) {
      throw new Error(`User ${newUser.email} already exists`)
    }

    const user = new UserSchemaModel(newUser)
    user.password = await bcrypt.hash(newUser.password, 12)

    return await user.save().then((res) => {
        return res
      })
}

export const update = async (updatingUser: User): Promise<void> => {
    const updatedUser = await UserSchemaModel.findByIdAndUpdate(updatingUser.id, updatingUser)
  
    if (!updatedUser) {
      throw new Error(`User ${updatingUser.email} does not exist`)
    }
}

export const remove = async (removingUserId: String): Promise<void> => {
    const removedUser = await UserSchemaModel.findByIdAndDelete(removingUserId)
  
    if (!removedUser) {
      throw new Error(`User ${removingUserId} does not exist`)
    }
}

export const getSingle = async (gettingUserId: String): Promise<User> => {
    const existingUser = await UserSchemaModel.findById(gettingUserId)
  
    if (!existingUser) {
      throw new Error(`User ${gettingUserId} does not exist`)
    }

    return existingUser
}

export const search = async (searchCriteria: SearchUser): Promise<PaginationResults<User>> => {

    const conditions: FilterQuery<User> = {}

    if(searchCriteria.email){
      conditions.email = { $regex: new RegExp(`^${searchCriteria.email}`), $options: 'i' };
    }

    if(searchCriteria.firstName){
      conditions.firstName = { $regex: new RegExp(`^${searchCriteria.firstName}`), $options: 'i' };
        
    }

    if(searchCriteria.lastName){
      conditions.lastName = { $regex: new RegExp(`^${searchCriteria.lastName}`), $options: 'i' };        
    }

    const requirePagination = searchCriteria.pageNumber && searchCriteria.pageSize

    const aggregateSearchResults = await UserSchemaModel.aggregate([
      { $match: conditions },
      { $sort: { name: 1 } },
      {
        $facet: {
          counter: [
            { $count: 'totalCount' }
          ],
          paginatedResults: [
            ...(requirePagination 
              ? [
                { $skip: (searchCriteria.pageNumber! - 1) * searchCriteria.pageSize! },
                { $limit: searchCriteria.pageSize! }
              ] 
              : [])
          ]
        }
      }
    ])

    const totalCount = aggregateSearchResults[0].counter[0].totalCount

    const pageSize = requirePagination ? searchCriteria.pageSize : totalCount;
		const currentPageNumber = requirePagination ? searchCriteria.pageNumber : 1;

    const result: PaginationResults<User> = {
      totalRecords: totalCount,
      totalPages: Math.ceil(totalCount/pageSize),
      pageSize: pageSize!,
      pageNumber: currentPageNumber!,
      records: aggregateSearchResults[0].paginatedResults
    }

    return result
}



/*

export const search = async (searchCriteria: SearchUser): Promise<PaginationResults<User>> => {

    const query: any = {}

    if(searchCriteria.email){
        query.email = { $regex: `^${searchCriteria.email}`, $options: 'i' };
    }

    if(searchCriteria.firstName){
        query.firstName = { $regex: `^${searchCriteria.firstName}`, $options: 'i' };
        
    }

    if(searchCriteria.lastName){
        query.lastName = { $regex: `^${searchCriteria.lastName}`, $options: 'i' };
        
    }

    const requirePagination = searchCriteria.pageNumber && searchCriteria.pageSize
    let users : User[]

    if(!requirePagination){
        users = await UserSchemaModel
        .find(query)
    }

    users = await UserSchemaModel
    .find(query)
    .sort({email: 'asc'})
    .skip((searchCriteria.pageNumber! - 1) * searchCriteria.pageSize!)
    .limit(searchCriteria.pageSize!)
    

    const totalUsers: number = await UserSchemaModel.countDocuments()
    const pageSize = requirePagination ? searchCriteria.pageSize : totalUsers;
		const currentPageNumber = requirePagination ? searchCriteria.pageNumber : 1;

    const result: PaginationResults<User> = {
      totalUsers: totalUsers,
      pageSize: pageSize!,
      pageNumber: currentPageNumber!,
      records: users
    }

    return result
}

*/