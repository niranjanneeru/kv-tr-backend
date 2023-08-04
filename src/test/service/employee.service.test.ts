import { DataSource } from "typeorm";
import EmployeeRepository from "../../repository/employee.repository";
import EmployeeService from "../../service/employee.service";
import Employee from "../../entity/employee.entity";
import { when } from "jest-when";
import HttpException from "../../exception/http.exception";

describe('Employee Service', () => {
    let employeeService: EmployeeService;
    let employeeRepository: EmployeeRepository;

    beforeAll(() => {
        const dataSource: DataSource = {
            getRepository: jest.fn()
        } as unknown as DataSource;

        employeeRepository = new EmployeeRepository(dataSource.getRepository(Employee));
        employeeService = new EmployeeService(employeeRepository);
    });

    describe('Test for getEmployeeById', () => {
        test('Test Employee for id 1 - Error Case', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(1).mockResolvedValueOnce(null);
            employeeRepository.findEmployeeById = mockFunction;
            await expect(async () => {
                await employeeService.getEmployeeByID(1);
            }).rejects.toThrow(HttpException);
        })

        test('Test Employee for id 7 - Success Case', async () => {
            const mockFunction = jest.fn();
            when(mockFunction).calledWith(7).mockResolvedValue({
                "id": 7,
                "createdAt": "2023-08-03T23:53:50.969Z",
                "updatedAt": "2023-08-04T03:43:18.688Z",
                "deletedAt": null,
                "name": "Lav",
                "email": "lav@mel.com",
                "password": "$2b$10$Rwk.TCczha0RVHAc43Yw/ebHccohS984Q3togJ60VYGlpfeAv4N/.",
                "role": "DEVELOPER",
                "address": {
                    "id": 12,
                    "createdAt": "2023-08-03T23:53:50.969Z",
                    "updatedAt": "2023-08-04T03:22:25.360Z",
                    "deletedAt": null,
                    "line1": "Key 1 Value",
                    "pincode": "324234"
                },
                "department": null
            });
            employeeRepository.findEmployeeById = mockFunction;
            const employee = await employeeService.getEmployeeByID(7);
            expect(employee).toStrictEqual({
                "id": 7,
                "createdAt": "2023-08-03T23:53:50.969Z",
                "updatedAt": "2023-08-04T03:43:18.688Z",
                "deletedAt": null,
                "name": "Lav",
                "email": "lav@mel.com",
                "password": "$2b$10$Rwk.TCczha0RVHAc43Yw/ebHccohS984Q3togJ60VYGlpfeAv4N/.",
                "role": "DEVELOPER",
                "address": {
                    "id": 12,
                    "createdAt": "2023-08-03T23:53:50.969Z",
                    "updatedAt": "2023-08-04T03:22:25.360Z",
                    "deletedAt": null,
                    "line1": "Key 1 Value",
                    "pincode": "324234"
                },
                "department": null
            });
        })
    });
})