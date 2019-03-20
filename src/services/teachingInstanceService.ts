import { client } from '../clients/apiClient'
import Teachinginstance from '../models/TeachingInstance'

const { findOrCreateTeachinginstance, findUserById, findTeachingInstanceByCourseKey } = client

export function findOrCreateTeachinginstancePlaah(nt: Teachinginstance, token: string): any {
  return findOrCreateTeachinginstance(nt, token)
}

export function findUserByIdPlaah(userId: number): any {
  return findUserById(1)
}

export function findTeachingInstanceByCourseKeyPlaah(): any {
  return findTeachingInstanceByCourseKey()
}
