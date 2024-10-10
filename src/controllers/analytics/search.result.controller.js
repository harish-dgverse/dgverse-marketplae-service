const { PrismaClient } = require('@prisma/client');
const catchAsync = require('../../utils/catchAsync');
const prisma = new PrismaClient();

/**
   * Step 1: Create a new search record corresponding to dgverse_user_id
   * Step 2: Terminate if unique_id and user_id exist
   * Step 3: Add search count corresponding to search_text
   */
async function createDbRecord(searchText, userId, uniqueId, type) {
  try {
    await prisma.Search.create({
      data: {
        search_text: searchText,
        user_id: userId,
        unique_id: uniqueId,
        unique_id_type: type
      }

    });

    const response = await prisma.SearchCount.upsert({
      where: {
        unique_id: uniqueId

      },
      update: {
        count: { increment: 1 }

      },
      create: {
        unique_id: uniqueId

      }
    });

    return response;

  } catch (error) {
    if (error.code !== "P2002") {
      throw error;

    }
  }
}

const addSearchLog = catchAsync(async (req, res) => {
  const { uniqueId, searchText, type, userId } = req.body;
  createDbRecord(searchText, userId, uniqueId, type).then(() => {
    res.send();
  });
});

module.exports = {
  addSearchLog
}