import { beforeAll } from 'vitest'
import { setProjectAnnotations } from '@storybook/vue3'
import * as projectAnnotations from './preview'

const project = setProjectAnnotations(projectAnnotations)

beforeAll(project.beforeAll)