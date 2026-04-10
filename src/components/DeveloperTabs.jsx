import React, { useState, useEffect } from "react";

import {
  Database,
  Code2,
  BarChart3,
  Cloud,
  Smartphone,
  Bot,
  Globe,
  GitBranch,
  Zap,
  Copy,
  Check,
  Boxes,
  Network,
  Cpu,
  ChevronDown,
  ChevronRight,
  Server,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const DeveloperTabs = () => {
  const [activeSubcategory, setActiveSubcategory] = useState("save-data-basic");
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("data-operations");
  const [expandedCategory, setExpandedCategory] = useState("data-operations");
  const [animationTrigger, setAnimationTrigger] = useState(0);

  useEffect(() => {
    setAnimationTrigger((prev) => prev + 1);
  }, [activeSubcategory]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCategory = (categoryId) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      setSelectedCategory(categoryId);
      const newCategory = categories.find((c) => c.id === categoryId);
      if (newCategory && newCategory.subcategories.length > 0) {
        setActiveSubcategory(newCategory.subcategories[0].id);
      }
    }
  };

  const getCodeLanguage = (subcategoryId, code) => {
    if (subcategoryId.includes("javascript") || subcategoryId.includes("js"))
      return "javascript";
    if (subcategoryId.includes("typescript") || subcategoryId.includes("ts"))
      return "typescript";
    if (subcategoryId.includes("python")) return "python";
    if (subcategoryId.includes("swift") || subcategoryId.includes("ios"))
      return "swift";
    if (subcategoryId.includes("kotlin") || subcategoryId.includes("android"))
      return "kotlin";
    if (subcategoryId.includes("dart") || subcategoryId.includes("flutter"))
      return "dart";
    if (subcategoryId.includes("csharp") || subcategoryId.includes("dotnet"))
      return "csharp";
    if (subcategoryId.includes("graphql")) return "graphql";
    if (code.includes("curl") || subcategoryId.includes("rest")) return "bash";
    return "javascript";
  };

  const categories = [
    {
      id: "data-operations",
      name: "Data Operations",
      icon: Database,
      color: "violet",
      badge: "CRUD",
      subcategories: [
        {
          id: "save-data-basic",
          name: "Basic Save Operations",
          icon: Database,
          code: `// Basic Save Operations
import { PlatformClient } from '@your-platform/sdk';

const client = new PlatformClient({
  apiKey: 'your-api-key'
});

// Save single document
const saveDocument = async () => {
  const doc = {
    title: 'My First Document',
    content: 'Hello World',
    tags: ['tutorial', 'example'],
    createdAt: new Date().toISOString()
  };
  
  const result = await client.save('documents', doc);
  console.log('Saved with ID:', result.id);
};

// Save with custom ID
const saveWithCustomId = async () => {
  const customId = 'user_123_profile';
  const data = {
    name: 'John Doe',
    email: 'john@example.com',
    preferences: { theme: 'dark' }
  };
  
  await client.save('users', data, { id: customId });
};

// Batch save multiple documents
const batchSave = async () => {
  const documents = [
    { type: 'post', content: 'Post 1' },
    { type: 'post', content: 'Post 2' },
    { type: 'comment', text: 'Great post!' }
  ];
  
  const results = await client.batchSave('collection', documents);
  console.log(\`Saved \${results.length} documents\`);
};`,
        },
        {
          id: "save-data-advanced",
          name: "Advanced Save Operations",
          icon: Settings,
          code: `// Advanced Save Operations

// Conditional save (only if document doesn't exist)
const conditionalSave = async () => {
  const result = await client.save('products', productData, {
    condition: {
      field: 'sku',
      operator: 'not_exists'
    }
  });
};

// Upsert with merge
const upsertWithMerge = async () => {
  await client.upsert('users', 'user_456', {
    lastLogin: new Date().toISOString(),
    loginCount: { $inc: 1 }
  }, { merge: true });
};

// Save with validation
const saveWithValidation = async () => {
  const schema = {
    email: { type: 'string', required: true, pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ },
    age: { type: 'number', min: 18, max: 120 }
  };
  
  await client.save('users', userData, { 
    validate: true,
    schema: schema 
  });
};

// Atomic operations
const atomicSave = async () => {
  const session = await client.startTransaction();
  
  try {
    await session.save('accounts', { id: 'acc1', balance: 1000 });
    await session.save('transactions', { amount: 100, type: 'debit' });
    await session.commit();
  } catch (error) {
    await session.rollback();
    console.error('Transaction failed:', error);
  }
};`,
        },
        {
          id: "query-data",
          name: "Query Operations",
          icon: Network,
          code: `// Query Operations

// Basic queries
const basicQuery = await client.query('products')
  .where('price', '<', 100)
  .where('inStock', '==', true)
  .get();

// Complex filtering
const complexQuery = await client.query('orders')
  .where('total', '>', 1000)
  .where('status', 'in', ['pending', 'processing'])
  .where('createdAt', 'between', [startDate, endDate])
  .orderBy('createdAt', 'desc')
  .limit(50)
  .get();

// Aggregation pipeline
const aggregateStats = await client.aggregate('sales')
  .match({ year: 2024 })
  .group({
    _id: '$category',
    totalSales: { $sum: '$amount' },
    avgAmount: { $avg: '$amount' },
    count: { $sum: 1 }
  })
  .sort({ totalSales: -1 })
  .get();

// Full-text search
const searchResults = await client.search('articles')
  .match('content', 'machine learning')
  .boost('title', 3.0)
  .fuzzy({ maxEdits: 2 })
  .highlight({ field: 'content', fragmentSize: 100 })
  .get();`,
        },
      ],
    },
    {
      id: "sdks",
      name: "SDKs & Libraries",
      icon: Code2,
      color: "blue",
      badge: "8 SDKs",
      subcategories: [
        {
          id: "javascript-sdk",
          name: "JavaScript/TypeScript",
          icon: Code2,
          code: `// JavaScript/TypeScript SDK

// Installation
// npm install @your-platform/sdk

import { PlatformClient, QueryBuilder } from '@your-platform/sdk';

// Initialize
const client = new PlatformClient({
  apiKey: process.env.API_KEY,
  endpoint: 'https://api.yourplatform.com',
  timeout: 30000
});

// TypeScript interfaces
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// Type-safe operations
const getUser = async (userId: string): Promise<User> => {
  return await client.get<User>('users', userId);
};

// Real-time subscriptions
const subscription = client.subscribe('users', (change) => {
  switch (change.type) {
    case 'added':
      console.log('New user:', change.doc);
      break;
    case 'modified':
      console.log('User updated:', change.doc);
      break;
    case 'removed':
      console.log('User deleted:', change.oldDoc);
      break;
  }
});

// Error handling
try {
  await client.save('posts', postData);
} catch (error) {
  if (error.code === 'VALIDATION_ERROR') {
    console.error('Invalid data:', error.details);
  } else if (error.code === 'RATE_LIMITED') {
    console.error('Too many requests, retry after:', error.retryAfter);
  }
}`,
        },
        {
          id: "python-sdk",
          name: "Python SDK",
          icon: Boxes,
          code: `# Python SDK
# pip install your-platform-sdk

from platform_sdk import PlatformClient
from platform_sdk.models import User, Query
import asyncio

# Initialize client
client = PlatformClient(
    api_key="your-api-key",
    environment="production"
)

# Async operations
async def main():
    # Save data
    user = User(
        name="Alice Smith",
        email="alice@example.com",
        metadata={"plan": "premium"}
    )
    
    result = await client.save("users", user)
    print(f"Saved user: {result.id}")
    
    # Query with filters
    query = Query("products")\\
        .where("price", "<", 100)\\
        .where("in_stock", "==", True)\\
        .order_by("price", descending=False)\\
        .limit(20)
    
    products = await client.query(query)
    
    # Batch operations
    async with client.batch() as batch:
        for i in range(100):
            batch.save("logs", {"index": i, "timestamp": datetime.now()})
    
    # Real-time listener
    @client.on("documents.changed")
    async def handle_change(change):
        print(f"Document {change.doc_id} was {change.type}")

# Run async main
asyncio.run(main())`,
        },
        {
          id: "ios-sdk",
          name: "iOS Swift SDK",
          icon: Smartphone,
          code: `// iOS Swift SDK
// Podfile: pod 'PlatformSDK'

import PlatformSDK
import Combine

class DataService: ObservableObject {
    private var client: PlatformClient
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        let config = PlatformConfig(
            apiKey: "your-api-key",
            baseURL: URL(string: "https://api.yourplatform.com")!,
            cachePolicy: .returnCacheDataElseLoad
        )
        client = PlatformClient(config: config)
    }
    
    // Save data with Combine
    func saveUser(_ user: User) -> AnyPublisher<User, Error> {
        return client.save("users", data: user)
            .map { response in
                var savedUser = user
                savedUser.id = response.id
                return savedUser
            }
            .eraseToAnyPublisher()
    }
    
    // Query with async/await
    func getActiveUsers() async throws -> [User] {
        let query = Query("users")
            .where("status", equals: "active")
            .where("lastActive", greaterThan: Date().addingTimeInterval(-86400))
            .orderBy("name", ascending: true)
        
        return try await client.query(query)
    }
    
    // Real-time subscription
    func subscribeToProducts() {
        client.subscribe("products")
            .sink(receiveCompletion: { completion in
                print("Subscription ended: \\(completion)")
            }, receiveValue: { change in
                switch change {
                case .added(let product):
                    print("New product: \\(product.name)")
                case .modified(let product):
                    print("Product updated: \\(product.name)")
                case .removed(let id):
                    print("Product removed: \\(id)")
                }
            })
            .store(in: &cancellables)
    }
}`,
        },
        {
          id: "android-sdk",
          name: "Android Kotlin SDK",
          icon: Bot,
          code: `// Android Kotlin SDK
// build.gradle: implementation 'com.yourplatform:sdk:1.0.0'

class PlatformRepository(private val context: Context) {
    private lateinit var client: PlatformClient
    
    suspend fun initialize() {
        val config = PlatformConfig.Builder()
            .setApiKey("your-api-key")
            .setBaseUrl("https://api.yourplatform.com")
            .enableCache(true)
            .setTimeout(30, TimeUnit.SECONDS)
            .build()
        
        client = PlatformClient.getInstance(config)
    }
    
    // Flow for reactive streams
    fun observeUsers(): Flow<List<User>> = flow {
        val query = Query("users")
            .where("active", true)
            .orderBy("createdAt", SortDirection.DESCENDING)
        
        while(true) {
            val users = client.query(query)
            emit(users)
            delay(5000) // Refresh every 5 seconds
        }
    }.flowOn(Dispatchers.IO)
    
    // Coroutines with error handling
    suspend fun saveUser(user: User): Result<User> {
        return try {
            val saved = client.save("users", user)
            Result.success(saved)
        } catch (e: NetworkException) {
            Result.failure(Exception("Network error: \${e.message}"))
        } catch (e: ValidationException) {
            Result.failure(Exception("Invalid user data: \${e.errors}"))
        }
    }
    
    // LiveData for UI
    fun getProducts(): LiveData<List<Product>> {
        val liveData = MutableLiveData<List<Product>>()
        viewModelScope.launch {
            val query = Query("products").where("inStock", true)
            val products = client.query(query)
            liveData.postValue(products)
        }
        return liveData
    }
}`,
        },
        {
          id: "flutter-sdk",
          name: "Flutter/Dart SDK",
          icon: Boxes,
          code: `// Flutter/Dart SDK
// pubspec.yaml: platform_sdk: ^1.0.0

import 'package:platform_sdk/platform_sdk.dart';
import 'package:flutter/foundation.dart';

class PlatformService extends ChangeNotifier {
  late PlatformClient _client;
  
  Future<void> init() async {
    _client = PlatformClient(
      apiKey: 'your-api-key',
      config: ClientConfig(
        baseUrl: 'https://api.yourplatform.com',
        enableLogging: kDebugMode,
        retryAttempts: 3,
      ),
    );
  }
  
  // Stream for real-time updates
  Stream<List<Post>> getRealtimePosts() {
    final query = Query('posts')
      .where('published', isEqualTo: true)
      .orderBy('createdAt', descending: true)
      .limit(20);
    
    return _client.subscribe(query).map((change) {
      return change.documents;
    });
  }
  
  // Future-based operations
  Future<void> createComment(String postId, String content) async {
    final comment = {
      'postId': postId,
      'content': content,
      'createdAt': DateTime.now().toIso8601String(),
      'likes': 0,
    };
    
    try {
      await _client.save('comments', comment);
      notifyListeners();
    } catch (e) {
      throw PlatformException('Failed to create comment: $e');
    }
  }
  
  // Batch operations
  Future<void> syncOfflineData(List<Map<String, dynamic>> pendingOps) async {
    final batch = _client.batch();
    
    for (var op in pendingOps) {
      switch (op['type']) {
        case 'save':
          batch.save(op['collection'], op['data']);
          break;
        case 'delete':
          batch.delete(op['collection'], op['id']);
          break;
      }
    }
    
    await batch.commit();
  }
}`,
        },
        {
          id: "dotnet-sdk",
          name: ".NET C# SDK",
          icon: Cpu,
          code: `// .NET C# SDK
// Install-Package YourPlatform.Sdk

using YourPlatform.Sdk;
using YourPlatform.Sdk.Models;
using System.Reactive.Linq;

public class PlatformService
{
    private readonly PlatformClient _client;
    
    public PlatformService(IConfiguration config)
    {
        var settings = new PlatformSettings
        {
            ApiKey = config["Platform:ApiKey"],
            BaseUrl = config["Platform:BaseUrl"],
            Timeout = TimeSpan.FromSeconds(30),
            RetryPolicy = RetryPolicy.ExponentialBackoff
        };
        
        _client = new PlatformClient(settings);
    }
    
    // Async operations
    public async Task<User> CreateUserAsync(UserCreateDto dto)
    {
        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            Metadata = new Dictionary<string, object>
            {
                ["source"] = "api",
                ["signupDate"] = DateTime.UtcNow
            }
        };
        
        return await _client.SaveAsync<User>("users", user);
    }
    
    // IObservable for reactive streams
    public IObservable<Product> ObserveProducts(string category)
    {
        var query = new QueryBuilder("products")
            .Where(p => p.Category == category)
            .Where(p => p.InStock)
            .Build();
        
        return _client.Subscribe<Product>(query)
            .Select(change => change.Document);
    }
    
    // LINQ-style queries
    public async Task<List<Order>> GetHighValueOrdersAsync()
    {
        var query = from o in _client.Query<Order>("orders")
                    where o.Total > 1000
                    where o.Status != OrderStatus.Cancelled
                    orderby o.CreatedAt descending
                    select o;
        
        return await query.Take(50).ToListAsync();
    }
}`,
        },
      ],
    },
    {
      id: "apis",
      name: "APIs & Protocols",
      icon: Globe,
      color: "",
      badge: "2 APIs",
      subcategories: [
        {
          id: "graphql-api",
          name: "GraphQL API",
          icon: BarChart3,
          code: `// GraphQL API Examples

// Queries
const GET_USER_WITH_POSTS = \`
  query GetUserWithPosts($userId: ID!, $limit: Int = 10) {
    user(id: $userId) {
      id
      name
      email
      profile {
        avatar
        bio
        location
      }
      posts(limit: $limit, orderBy: { field: createdAt, direction: DESC }) {
        id
        title
        content
        likesCount
        commentsCount
        createdAt
        author {
          id
          name
        }
      }
      followers {
        totalCount
        edges {
          node {
            id
            name
          }
        }
      }
    }
  }
\`;

// Mutations with input types
const CREATE_POST_MUTATION = \`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
      publishedAt
      author {
        id
        name
      }
      errors {
        field
        message
      }
    }
  }
\`;

// Subscriptions for real-time
const POST_SUBSCRIPTION = \`
  subscription OnPostCreated($topicId: ID!) {
    postCreated(topicId: $topicId) {
      id
      title
      content
      author {
        id
        name
      }
      createdAt
    }
  }
\`;

// Fragments for reusability
const USER_FRAGMENT = \`
  fragment UserDetails on User {
    id
    name
    email
    createdAt
    isActive
  }
\`;

// Usage with Apollo Client
const { data } = await client.query({
  query: GET_USER_WITH_POSTS,
  variables: { userId: '123', limit: 20 },
  fetchPolicy: 'network-only'
});`,
        },
        {
          id: "rest-api",
          name: "REST API",
          icon: Server,
          code: `// REST API Endpoints

// GET with filters and pagination
const getProducts = async (filters) => {
  const params = new URLSearchParams({
    category: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    page: filters.page || 1,
    limit: filters.limit || 20,
    sort: 'price:asc'
  });
  
  const response = await fetch(\`/api/v1/products?\${params}\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Accept': 'application/json'
    }
  });
  
  const { data, pagination } = await response.json();
  return { products: data, pagination };
};

// POST with validation
const createOrder = async (orderData) => {
  const response = await fetch('/api/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': \`Bearer \${token}\`,
      'Idempotency-Key': generateIdempotencyKey()
    },
    body: JSON.stringify({
      items: orderData.items,
      shippingAddress: orderData.address,
      paymentMethod: orderData.paymentMethod,
      couponCode: orderData.coupon
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new APIError(error.code, error.message);
  }
  
  return await response.json();
};

// PUT for full updates
const updateUser = async (userId, userData) => {
  await fetch(\`/api/v1/users/\${userId}\`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
};

// PATCH for partial updates
const patchSettings = async (settings) => {
  await fetch('/api/v1/user/settings', {
    method: 'PATCH',
    body: JSON.stringify(settings)
  });
};

// DELETE with soft delete
const deletePost = async (postId) => {
  await fetch(\`/api/v1/posts/\${postId}\`, {
    method: 'DELETE',
    headers: { 'X-Soft-Delete': 'true' }
  });
};`,
        },
      ],
    },
    {
      id: "advanced",
      name: "Advanced Features",
      icon: Zap,
      color: "orange",
      badge: "3 Features",
      subcategories: [
        {
          id: "cloud-functions",
          name: "Cloud Functions",
          icon: Cloud,
          code: `// Cloud Functions

// HTTP-triggered function
export const apiHandler = new FunctionBuilder()
  .http({ cors: true, auth: 'required' })
  .handler(async (req, res) => {
    const { userId } = req.auth;
    const { action, data } = req.body;
    
    switch (action) {
      case 'process':
        const result = await processUserData(userId, data);
        return res.json({ success: true, result });
      case 'validate':
        const isValid = await validateData(data);
        return res.json({ isValid });
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  });

// Database trigger
export const onDocumentChange = new FunctionBuilder()
  .database()
  .on('documents', ['create', 'update', 'delete'])
  .handler(async (change, context) => {
    const { documentType, operation, document } = change;
    
    // Log change
    await db.collection('audit_logs').insert({
      documentType,
      operation,
      documentId: document.id,
      timestamp: context.timestamp,
      userId: context.auth.uid
    });
    
    // Trigger side effects
    if (operation === 'create' && documentType === 'order') {
      await notifyAdmin('New order created', document);
      await updateInventory(document.items);
    }
  });

// Scheduled function (every 15 minutes)
export const cleanupExpiredSessions = new FunctionBuilder()
  .schedule('*/15 * * * *')
  .handler(async () => {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const deleted = await db.collection('sessions')
      .where('lastActive', '<', cutoff)
      .delete();
    
    console.log(\`Cleaned up \${deleted} expired sessions\`);
    
    // Send metrics
    await metrics.record('sessions.cleaned', deleted);
  });

// Pub/Sub function
export const handlePubSub = new FunctionBuilder()
  .pubsub()
  .topic('user.events')
  .handler(async (message) => {
    const { eventType, userId, data } = JSON.parse(message.data);
    
    switch (eventType) {
      case 'user.created':
        await sendWelcomeEmail(userId);
        await createDefaultSettings(userId);
        break;
      case 'user.deleted':
        await cleanupUserData(userId);
        break;
    }
  });`,
        },
        {
          id: "extend-schema",
          name: "Extend GraphQL Schema",
          icon: GitBranch,
          code: `// Extending GraphQL Schema

// Custom type definitions
const typeDefs = \`
  extend type Query {
    analytics: AnalyticsQuery!
    recommendations(userId: ID!): [Product!]!
  }
  
  type AnalyticsQuery {
    dailyActiveUsers(date: Date!): Int!
    revenue(period: TimePeriod!): RevenueReport!
    topProducts(limit: Int): [ProductAnalytics!]!
  }
  
  type RevenueReport {
    total: Float!
    change: Float!
    breakdown: [RevenueByCategory!]!
  }
  
  type RevenueByCategory {
    category: String!
    amount: Float!
    percentage: Float!
  }
  
  type ProductAnalytics {
    product: Product!
    views: Int!
    purchases: Int!
    conversionRate: Float!
  }
  
  extend type User {
    personalizedFeed(limit: Int): [Content!]!
    recommendations: [Product!]!
    activitySummary: ActivitySummary!
  }
  
  input TimePeriod {
    start: DateTime!
    end: DateTime!
    granularity: Granularity
  }
  
  enum Granularity {
    DAY
    WEEK
    MONTH
    QUARTER
  }
\`;

// Resolvers with data fetching
const resolvers = {
  Query: {
    analytics: () => ({}),
    recommendations: async (_, { userId }, { dataSources }) => {
      const userProfile = await dataSources.db.getUserProfile(userId);
      return await dataSources.recommendationEngine.getRecommendations(userProfile);
    }
  },
  
  AnalyticsQuery: {
    dailyActiveUsers: async (_, { date }, { dataSources }) => {
      return await dataSources.analytics.getDAU(date);
    },
    revenue: async (_, { period }, { dataSources }) => {
      const revenue = await dataSources.db.getRevenue(period);
      const previousRevenue = await dataSources.db.getRevenue(getPreviousPeriod(period));
      
      return {
        total: revenue,
        change: ((revenue - previousRevenue) / previousRevenue) * 100,
        breakdown: await getRevenueBreakdown(period)
      };
    }
  },
  
  User: {
    personalizedFeed: async (parent, { limit }, { dataSources }) => {
      const interests = await dataSources.db.getUserInterests(parent.id);
      return await dataSources.contentEngine.generateFeed(interests, limit);
    }
  }
};`,
        },
        {
          id: "call-functions",
          name: "Call Cloud Functions",
          icon: Zap,
          code: `// Calling Cloud Functions

// HTTP call with authentication
const callAPI = async () => {
  const response = await functions.call('apiHandler', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${await getAuthToken()}\`,
      'X-Request-ID': uuidv4()
    },
    body: {
      action: 'process',
      data: { userId: '123', operation: 'sync' }
    },
    timeout: 30000
  });
  
  return response.json();
};

// Invoke with retry logic
const invokeWithRetry = async (functionName, payload, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const result = await functions.invoke(functionName, payload);
      return result;
    } catch (error) {
      if (i === maxRetries - 1 || error.code !== 'RATE_LIMITED') {
        throw error;
      }
      await delay(Math.pow(2, i) * 1000); // Exponential backoff
    }
  }
};

// Stream response for large data
const streamExport = async () => {
  const stream = await functions.stream('exportData', {
    format: 'csv',
    collection: 'analytics',
    filters: { date: { $gte: '2024-01-01' } }
  });
  
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
    console.log(\`Received chunk: \${chunk.length} bytes\`);
  }
  
  return Buffer.concat(chunks);
};

// Call with context
const callWithContext = async () => {
  const result = await functions.call('processOrder', {
    orderId: 'order_123',
    items: cartItems
  }, {
    context: {
      userId: currentUser.id,
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    },
    priority: 'high',
    idempotencyKey: \`process_\${orderId}\`
  });
};

// Batch function calls
const batchProcess = async (items) => {
  const promises = items.map(item => 
    functions.call('validateItem', item)
      .catch(err => ({ error: err, item }))
  );
  
  const results = await Promise.allSettled(promises);
  
  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');
  
  return { successful, failed };
};`,
        },
      ],
    },
  ];

  const currentCategory =
    categories.find((c) => c.id === selectedCategory) || categories[0];
  const currentSubcategory =
    currentCategory.subcategories.find((s) => s.id === activeSubcategory) ||
    currentCategory.subcategories[0];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentSubcategory.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const newCategory = categories.find((c) => c.id === categoryId);
    setActiveSubcategory(newCategory.subcategories[0].id);
    setMobileMenuOpen(false);
  };

  const codeLanguage = getCodeLanguage(
    activeSubcategory,
    currentSubcategory.code,
  );

  return (
    <div className="py-16 bg-[#0d0d14]">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8 text-center">
          <h1
            data-cursor="-opaque"
            className="text-white text-center text-2xl md:text-5xl font-bold leading-[1.05] tracking-tight cursor-none mb-6"
          >
            A
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-sky-400 bg-clip-text text-transparent">
              {" "}
              Developer-Focused Platform{" "}
            </span>{" "}
            <br />
            <em className="not-italic text-white">Built for Simplicity</em>
          </h1>

          <p className="text-white/40 text-center text-xs sm:text-lg lg:text-xl max-w-5xl mx-auto leading-relaxed mb-14">
            Spiderlync simplifies development by offering a clear, organized
            platform, helping developers deliver high-quality applications
            efficiently and confidently at scale.
          </p>
        </div>

        <div className="lg:hidden mb-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-3 bg-black/60 backdrop-blur-sm rounded-xl border border-indigo-500/20"
          >
            <div className="flex items-center gap-3">
              <span className="text-gray-200 font-medium">
                {currentCategory.name}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-950/50 text-indigo-300">
                {currentCategory.badge}
              </span>
            </div>
            {mobileMenuOpen ? (
              <X size={20} className="text-gray-400" />
            ) : (
              <Menu size={20} className="text-gray-400" />
            )}
          </button>

          {mobileMenuOpen && (
            <div className="absolute left-4 right-4 mt-2 z-20 bg-black/90 backdrop-blur-sm rounded-xl border border-indigo-500/20 overflow-hidden shadow-xl">
              {categories.map((category) => {
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 transition-all ${
                      isSelected
                        ? `bg-indigo-950/50 text-indigo-400`
                        : "text-gray-400 hover:bg-gray-800/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-normal">{category.name}</span>
                    </div>
                    {isSelected && <Check size={16} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block xl:w-80 flex-shrink-0">
            <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-indigo-500/20 sticky top-20 h-fit">
              <div className="max-h-[70vh] ">
                {categories.map((category) => {
                  const isExpanded = expandedCategory === category.id;
                  const isSelected = selectedCategory === category.id;

                  return (
                    <div
                      key={category.id}
                      className="border-b border-indigo-500/10"
                    >
                      <button
                        onClick={() => toggleCategory(category.id)}
                        className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                          isSelected
                            ? `bg-${category.color}-950/30`
                            : "hover:bg-indigo-950/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-medium ${isSelected ? `text-${category.color}-400` : "text-gray-200"}`}
                          >
                            {category.name}
                          </span>
                          <span className="text-xs px-1.5 py-0.5 rounded-full bg-indigo-950/50 text-indigo-300">
                            {category.badge}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown size={16} className="text-gray-400" />
                        ) : (
                          <ChevronRight size={16} className="text-gray-400" />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="pb-2">
                          {category.subcategories.map((sub) => {
                            const SubIcon = sub.icon;
                            const isActive = activeSubcategory === sub.id;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => setActiveSubcategory(sub.id)}
                                className={`w-full px-4 py-2 pl-11 flex items-center gap-3 transition-all duration-200 ${
                                  isActive
                                    ? `bg-indigo-950/50 text-${category.color}-400 border-l-4 border-indigo-500`
                                    : "text-gray-400 hover:bg-gray-800/50 hover:text-gray-300"
                                }`}
                              >
                                <SubIcon size={14} />
                                <span className="text-sm">{sub.name}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-black/60 backdrop-blur-sm rounded-xl border border-indigo-500/20 overflow-hidden">
              <div className="block lg:hidden border-b border-indigo-500/20 bg-gradient-to-r from-indigo-950/10 to-transparent overflow-x-auto">
                <div className="flex min-w-max">
                  {currentCategory.subcategories.map((sub) => {
                    const SubIcon = sub.icon;
                    const isActive = activeSubcategory === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setActiveSubcategory(sub.id)}
                        className={`flex items-center gap-2 px-4 py-3 whitespace-nowrap transition-all duration-200 ${
                          isActive
                            ? `text-${currentCategory.color}-400 border-b-2 border-${currentCategory.color}-500 bg-gradient-to-b from-${currentCategory.color}-950/20 to-transparent`
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                      >
                        <SubIcon size={16} />
                        <span className="text-sm font-medium">{sub.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-950/10 to-transparent">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs md:text-sm text-gray-400 font-mono">
                      {currentSubcategory.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}
                      .example
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-950/50 text-indigo-300 border border-indigo-500/30 hidden sm:inline-block">
                      {activeSubcategory.includes("sdk")
                        ? "SDK"
                        : activeSubcategory.includes("api")
                          ? "API"
                          : "Example"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 md:gap-2 px-2 py-1 md:px-3 md:py-1.5 rounded-lg bg-indigo-950/60 text-gray-300 hover:bg-indigo-900/60 transition-all border border-indigo-500/30"
                >
                  {copied ? (
                    <Check size={14} className="text-green-400 md:w-4 md:h-4" />
                  ) : (
                    <Copy size={14} className="md:w-4 md:h-4" />
                  )}
                  <span className="text-xs md:text-sm">
                    {copied ? "Copied!" : "Copy"}
                  </span>
                </button>
              </div>

              <div className="relative bg-black/90 overflow-x-auto">
                <div className="p-3 md:p-5">
                  <SyntaxHighlighter
                    key={animationTrigger}
                    language={codeLanguage}
                    style={oneDark}
                    showLineNumbers={true}
                    wrapLines={true}
                    customStyle={{
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      fontSize: "0.875rem",
                      lineHeight: "1.625",
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: "monospace",
                      },
                    }}
                  >
                    {currentSubcategory.code}
                  </SyntaxHighlighter>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTabs;
