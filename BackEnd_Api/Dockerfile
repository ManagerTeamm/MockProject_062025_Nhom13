# Use the official .NET 8 runtime as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Use the official .NET 8 SDK to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["BackEnd_Api.csproj", "."]
RUN dotnet restore "./BackEnd_Api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "BackEnd_Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BackEnd_Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BackEnd_Api.dll"]