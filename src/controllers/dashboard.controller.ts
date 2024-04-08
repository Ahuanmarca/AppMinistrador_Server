import { Request, Response } from 'express';
import * as buildingsService from '../service/buildings.service';
import * as providersService from '../service/providers.service';
import * as bankingService from '../service/banking.service';
import * as peopleService from '../service/people.service';

// Data we need on dashbaord:
// - Building list          ✔
// - Incidences             ✔️
// - President              ✔
// - Providers              ✔
// - Cuotas del mes         ✔️
// - Ingresos vs. gastos    ✔️ -- 'start' / 'end' (dates) must come from Client
// - Total inquilinos       ✔️ -- 'dates' must come from Client
// - Total propietarios

async function getDashboardDataByBuildingId(req: Request, res: Response) {
  const { buildingId, accountId } = req.params;
  const { start, end } = req.query;

  if (typeof start !== 'string' || typeof end !== 'string') {
    return res.json({ Error: 'Provide valid dates for cashflow range' });
  }

  // Check if there are query params
  // If not, must pass empty array to service
  let dates: Array<string>;
  if (typeof req.query.dates === 'string') {
    dates = [req.query.dates];
  } else if (
    Array.isArray(req.query.dates) &&
    req.query.dates.every((e) => typeof e === 'string')
  ) {
    dates = req.query.dates as string[];
  } else {
    dates = [];
  }

  const buildingList = await buildingsService.getBuildingsList();
  const buildingData = await buildingsService.getBuildingById(
    Number(buildingId)
  );
  const providers = await providersService.getAllProviders();
  const currentMonthFees = await bankingService.getCurrentMonthFees(
    Number(buildingId)
  );

  const cashFlow = await bankingService.getAccountCashflowByMonthRange(
    Number(accountId),
    start,
    end
  );

  const neighboursCount = await peopleService.countNeighboursByBuildingId(
    Number(buildingId),
    dates
  );

  const ownersCount = await peopleService.countOwnersByBuildingId(
    Number(buildingId)
  );

  res.json({
    buildingList,
    buildingData,
    providers,
    currentMonthFees,
    cashFlow,
    neighboursCount,
    ownersCount,
  });
}

export { getDashboardDataByBuildingId };
