import { HealthService } from "../../../service/health.service";
import { TestData } from "../../test.data"

const healthService = new HealthService()
const packageJson = require('../../../../package.json');

describe('health service tests',()=>{
  it('pings correctly', () => {
    const actual = healthService.ping()

    expect(actual.pong).toBe(true)
  })
  
  it('returns version info correctly', () => {
    const actual = healthService.getVersion()

    expect(actual.env).toBe(process.env.NODE_ENV)
    expect(actual.version).toBe(packageJson.version)
    expect(actual.name).toBe(packageJson.name)
  })
})